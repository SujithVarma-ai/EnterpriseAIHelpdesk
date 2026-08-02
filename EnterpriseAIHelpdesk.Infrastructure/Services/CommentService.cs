using EnterpriseAIHelpdesk.Application.DTOs.Comment;
using EnterpriseAIHelpdesk.Application.Interfaces;
using EnterpriseAIHelpdesk.Domain.Entities;
using EnterpriseAIHelpdesk.Persistence.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EnterpriseAIHelpdesk.Infrastructure.Services;

public class CommentService : ICommentService
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CommentService(
        ApplicationDbContext context,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<bool> AddCommentAsync(Guid ticketId, CreateCommentDto createCommentDto)
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User
            ?.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdClaim))
            return false;

        var ticket = await _context.Tickets.FindAsync(ticketId);

        if (ticket == null)
            return false;

        var comment = new Comment
        {
            TicketId = ticketId,
            UserId = Guid.Parse(userIdClaim),
            Message = createCommentDto.Message
        };

        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<CommentResponseDto>> GetCommentsAsync(Guid ticketId)
    {
        return await _context.Comments
            .Where(c => c.TicketId == ticketId)
            .OrderBy(c => c.CreatedAt)
            .Select(c => new CommentResponseDto
            {
                Id = c.Id,
                Message = c.Message,
                UserId = c.UserId,
                CreatedAt = c.CreatedAt
            })
            .ToListAsync();
    }
}