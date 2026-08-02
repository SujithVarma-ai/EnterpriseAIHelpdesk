using EnterpriseAIHelpdesk.Domain.Common;

namespace EnterpriseAIHelpdesk.Domain.Entities;

public class Comment : BaseEntity
{
    public Guid TicketId { get; set; }

    public Ticket Ticket { get; set; } = null!;

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string Message { get; set; } = string.Empty;
}