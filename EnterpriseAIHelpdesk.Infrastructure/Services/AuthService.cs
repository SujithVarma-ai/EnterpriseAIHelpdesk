using EnterpriseAIHelpdesk.Application.DTOs.Auth;
using EnterpriseAIHelpdesk.Application.Interfaces;
using EnterpriseAIHelpdesk.Domain.Entities;
using EnterpriseAIHelpdesk.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseAIHelpdesk.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    private readonly PasswordHasher<User> _passwordHasher = new();

    public AuthService(
        ApplicationDbContext context,
        IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<bool> RegisterAsync(RegisterDto registerDto)
    {
    // Check if email already exists
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == registerDto.Email);

        if (existingUser != null)
        {
            return false;
        }

    // Create new user
        var user = new User
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = _passwordHasher.HashPassword(null!, registerDto.Password)
        };

    // Save to database
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<string?> LoginAsync(LoginDto loginDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u =>
            u.Email == loginDto.Email);

        if (user == null)
            return null;

        var result = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            loginDto.Password);

        if (result == PasswordVerificationResult.Failed)
            return null;

        return _jwtService.GenerateToken(user);
    }
}