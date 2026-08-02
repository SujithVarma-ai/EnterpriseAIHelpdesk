using EnterpriseAIHelpdesk.Application.DTOs.Auth;
using EnterpriseAIHelpdesk.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnterpriseAIHelpdesk.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var result = await _authService.RegisterAsync(registerDto);
        if (!result)
            return BadRequest("Registration Failed");
        return Ok("User Registered Successfully");
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var result = await _authService.LoginAsync(loginDto);
        if (result == null)
            return Unauthorized("Invalid Email or Password");
        return Ok(result);
    }
}
