using EnterpriseAIHelpdesk.Domain.Enums;

namespace EnterpriseAIHelpdesk.Application.Interfaces;

public interface IAIService
{
    Task<string> ClassifyTicketAsync(
        string title,
        string description);

    Task<TicketPriority> PredictPriorityAsync(
        string title,
        string description);

    Task<string> SummarizeTicketAsync(
        string title,
        string description,
        List<string> comments);
}