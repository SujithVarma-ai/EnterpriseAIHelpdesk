using EnterpriseAIHelpdesk.Domain.Common;
using EnterpriseAIHelpdesk.Domain.Enums;

namespace EnterpriseAIHelpdesk.Domain.Entities;

public class Ticket : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketStatus Status { get; set; } = TicketStatus.Open;

    public TicketPriority Priority { get; set; } = TicketPriority.Medium;
    public string Category { get; set; } = "General";

    public Guid CreatedByUserId { get; set; }

    public Guid? AssignedToUserId { get; set; }
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}