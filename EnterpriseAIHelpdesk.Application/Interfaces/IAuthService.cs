using EnterpriseAIHelpdesk.Application.DTOs.Auth;

namespace EnterpriseAIHelpdesk.Application.Interfaces;

public interface IAuthService
{
    Task<bool> RegisterAsync(RegisterDto registerDto);

    Task<string?> LoginAsync(LoginDto loginDto);
}