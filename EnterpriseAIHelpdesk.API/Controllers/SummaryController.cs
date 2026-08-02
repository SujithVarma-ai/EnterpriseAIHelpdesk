using EnterpriseAIHelpdesk.Application.Interfaces;
using EnterpriseAIHelpdesk.Persistence.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseAIHelpdesk.API.Controllers;

[ApiController]
[Route("api/summary")]
[Authorize]
public class SummaryController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IAIService _aiService;

    public SummaryController(
        ApplicationDbContext context,
        IAIService aiService)
    {
        _context = context;
        _aiService = aiService;
    }

    [HttpGet("{ticketId:guid}")]
    public async Task<IActionResult> GetSummary(Guid ticketId)
    {
        var ticket = await _context.Tickets
            .Include(t => t.Comments)
            .FirstOrDefaultAsync(t => t.Id == ticketId);

        if (ticket == null)
            return NotFound();

        var comments = ticket.Comments
            .Select(c => c.Message)
            .ToList();

        var summary = await _aiService.SummarizeTicketAsync(
            ticket.Title,
            ticket.Description,
            comments);

        return Ok(new
        {
            TicketId = ticket.Id,
            Summary = summary
        });
    }
}