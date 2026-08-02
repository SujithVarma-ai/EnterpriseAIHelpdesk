using EnterpriseAIHelpdesk.Application.DTOs.Ticket;
using EnterpriseAIHelpdesk.Application.Interfaces;
using EnterpriseAIHelpdesk.Domain.Entities;
using EnterpriseAIHelpdesk.Persistence.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EnterpriseAIHelpdesk.Infrastructure.Services;

public class TicketService : ITicketService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAIService _aiService;

    public TicketService(
        ApplicationDbContext context,
        IHttpContextAccessor httpContextAccessor,
        IAIService aiService)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _aiService = aiService;
    }

    public async Task<bool> CreateTicketAsync(CreateTicketDto createTicketDto)
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User
            .FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdClaim))
            return false;

        var userId = Guid.Parse(userIdClaim);

    // AI Category
        var category = await _aiService.ClassifyTicketAsync(
            createTicketDto.Title,
            createTicketDto.Description);

    // AI Priority
        var priority = await _aiService.PredictPriorityAsync(
            createTicketDto.Title,
            createTicketDto.Description);

        var ticket = new Ticket
        {
            Title = createTicketDto.Title,
            Description = createTicketDto.Description,
            Priority = priority,
            Category = category,
            CreatedByUserId = userId
        };

        await _context.Tickets.AddAsync(ticket);
        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<List<TicketResponseDto>> GetAllTicketsAsync()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User
            .FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdClaim))
            return new List<TicketResponseDto>();

        var userId = Guid.Parse(userIdClaim);

        return await _context.Tickets
            .Where(t => t.CreatedByUserId == userId)
            .Select(t => new TicketResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Priority = t.Priority,
                Status = t.Status,
                CreatedByUserId = t.CreatedByUserId,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<TicketResponseDto?> GetTicketByIdAsync(Guid id)
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User
            .FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdClaim))
            return null;

        var userId = Guid.Parse(userIdClaim);

        return await _context.Tickets
            .Where(t => t.Id == id && t.CreatedByUserId == userId)
            .Select(t => new TicketResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Priority = t.Priority,
                Status = t.Status,
                CreatedByUserId = t.CreatedByUserId,
                CreatedAt = t.CreatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<bool> UpdateTicketAsync(Guid id, UpdateTicketDto updateTicketDto)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
            return false;

        ticket.Title = updateTicketDto.Title;
        ticket.Description = updateTicketDto.Description;
        ticket.Priority = updateTicketDto.Priority;
        ticket.Status = updateTicketDto.Status;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteTicketAsync(Guid id)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
            return false;

        _context.Tickets.Remove(ticket);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> AssignTicketAsync(Guid ticketId, Guid assignedToUserId)
    {
        var ticket = await _context.Tickets.FindAsync(ticketId);

        if (ticket == null)
            return false;

        ticket.AssignedToUserId = assignedToUserId;

        await _context.SaveChangesAsync();

        return true;
    }
}