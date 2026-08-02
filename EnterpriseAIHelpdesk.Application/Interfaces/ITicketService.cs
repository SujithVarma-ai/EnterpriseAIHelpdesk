using EnterpriseAIHelpdesk.Application.DTOs.Ticket;

namespace EnterpriseAIHelpdesk.Application.Interfaces;

public interface ITicketService
{
    Task<bool> CreateTicketAsync(CreateTicketDto createTicketDto);

    Task<List<TicketResponseDto>> GetAllTicketsAsync();

    Task<TicketResponseDto?> GetTicketByIdAsync(Guid id);

    Task<bool> UpdateTicketAsync(Guid id, UpdateTicketDto updateTicketDto);

    Task<bool> DeleteTicketAsync(Guid id);
    Task<bool> AssignTicketAsync(Guid ticketId, Guid assignedToUserId);
}