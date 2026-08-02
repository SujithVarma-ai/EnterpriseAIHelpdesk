using EnterpriseAIHelpdesk.Domain.Enums;

namespace EnterpriseAIHelpdesk.Application.DTOs.Ticket;

public class TicketResponseDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketPriority Priority { get; set; }

    public TicketStatus Status { get; set; }

    public Guid CreatedByUserId { get; set; }

    public DateTime CreatedAt { get; set; }
}