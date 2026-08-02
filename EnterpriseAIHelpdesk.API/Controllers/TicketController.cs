using EnterpriseAIHelpdesk.Application.DTOs.Ticket;
using EnterpriseAIHelpdesk.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnterpriseAIHelpdesk.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TicketController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTicketDto dto)
    {
        var result = await _ticketService.CreateTicketAsync(dto);

        if (!result)
            return BadRequest();

        return Ok("Ticket Created Successfully");
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tickets = await _ticketService.GetAllTicketsAsync();

        return Ok(tickets);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var ticket = await _ticketService.GetTicketByIdAsync(id);

        if (ticket == null)
            return NotFound();

        return Ok(ticket);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateTicketDto dto)
    {
        var result = await _ticketService.UpdateTicketAsync(id, dto);

        if (!result)
            return NotFound();

        return Ok("Ticket Updated Successfully");
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _ticketService.DeleteTicketAsync(id);

        if (!result)
            return NotFound();

        return Ok("Ticket Deleted Successfully");
    }
}