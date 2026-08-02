using System.Net.Http;
using System.Text;
using System.Text.Json;
using EnterpriseAIHelpdesk.Application.Interfaces;
using EnterpriseAIHelpdesk.Domain.Enums;

namespace EnterpriseAIHelpdesk.Infrastructure.AI;

public class OllamaAIService : IAIService
{
    private readonly HttpClient _httpClient;

    public OllamaAIService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    private async Task<string> SendPromptAsync(string prompt)
    {
        var request = new
        {
            model = "llama3.2",
            prompt,
            stream = false
        };

        var json = JsonSerializer.Serialize(request);

        var response = await _httpClient.PostAsync(
            "http://localhost:11434/api/generate",
            new StringContent(json, Encoding.UTF8, "application/json"));

        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();

        using var document = JsonDocument.Parse(responseJson);

        return document.RootElement
            .GetProperty("response")
            .GetString()?
            .Trim() ?? string.Empty;
    }

    public async Task<string> ClassifyTicketAsync(string title, string description)
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

    public async Task<TicketPriority> PredictPriorityAsync(string title, string description)
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
