using System.Text;
using System.Text.Json;
using EnterpriseAIHelpdesk.Application.Interfaces;
using EnterpriseAIHelpdesk.Domain.Enums;
using Microsoft.Extensions.Configuration;

namespace EnterpriseAIHelpdesk.Infrastructure.AI;

public class GeminiAIService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GeminiAIService(
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    private async Task<string> SendPromptAsync(string prompt)
    {
        var apiKey = _configuration["Gemini:ApiKey"];

        var requestBody = new
        {
            contents = new[]
            {
                new
                {
                    parts = new[]
                    {
                        new
                        {
                            text = prompt
                        }
                    }
                }
            }
        };

        var json = JsonSerializer.Serialize(requestBody);

        var url =
            $"https://generativelanguage.googleapis.com/v1beta/models/" +
            $"gemini-3.6-flash:generateContent?key={apiKey}";

        var response = await _httpClient.PostAsync(
            url,
            new StringContent(
                json,
                Encoding.UTF8,
                "application/json"));

        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception(
                $"Gemini API Error: {(int)response.StatusCode} - {responseContent}");
        }

        using var document =
            JsonDocument.Parse(responseContent);

        return document.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString()?
            .Trim() ?? string.Empty;
    }

    public async Task<string> ClassifyTicketAsync(
        string title,
        string description)
    {
        var prompt = $"""
Classify the following IT helpdesk ticket into exactly one category.

Categories:
- Hardware
- Software
- Network
- Security
- Database
- General

Title: {title}

Description: {description}

Return only the category name.
""";

        var result = await SendPromptAsync(prompt);

        return result switch
        {
            "Hardware" => "Hardware",
            "Software" => "Software",
            "Network" => "Network",
            "Security" => "Security",
            "Database" => "Database",
            _ => "General"
        };
    }

    public async Task<TicketPriority> PredictPriorityAsync(
        string title,
        string description)
    {
        var prompt = $"""
Predict the priority of this IT helpdesk ticket.

Possible priorities:
- Low
- Medium
- High
- Critical

Title: {title}

Description: {description}

Return only one word.
""";

        var result = await SendPromptAsync(prompt);

        return result switch
        {
            "Low" => TicketPriority.Low,
            "Medium" => TicketPriority.Medium,
            "High" => TicketPriority.High,
            "Critical" => TicketPriority.Critical,
            _ => TicketPriority.Medium
        };
    }

    public async Task<string> SummarizeTicketAsync(
        string title,
        string description,
        List<string> comments)
    {
        var commentsText = string.Join("\n- ", comments);

        var prompt = $"""
You are an IT Helpdesk assistant.

Summarize the following support ticket.

Title:
{title}

Description:
{description}

Comments:
- {commentsText}

Write a concise summary in 3-5 bullet points.
""";

        return await SendPromptAsync(prompt);
    }
}