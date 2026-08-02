using System.ComponentModel.DataAnnotations;
using EnterpriseAIHelpdesk.Domain.Enums;

namespace EnterpriseAIHelpdesk.Application.DTOs.Ticket;

public class CreateTicketDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public TicketPriority Priority { get; set; }
}