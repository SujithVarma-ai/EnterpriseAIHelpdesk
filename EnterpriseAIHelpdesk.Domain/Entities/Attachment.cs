using EnterpriseAIHelpdesk.Domain.Common;

namespace EnterpriseAIHelpdesk.Domain.Entities;

public class Attachment : BaseEntity
{
    public Guid TicketId { get; set; }

    public string FileName { get; set; } = string.Empty;

    public string FilePath { get; set; } = string.Empty;
}