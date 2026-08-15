# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY ["EnterpriseAIHelpdesk.API/EnterpriseAIHelpdesk.API.csproj", "EnterpriseAIHelpdesk.API/"]
COPY ["EnterpriseAIHelpdesk.Application/EnterpriseAIHelpdesk.Application.csproj", "EnterpriseAIHelpdesk.Application/"]
COPY ["EnterpriseAIHelpdesk.Domain/EnterpriseAIHelpdesk.Domain.csproj", "EnterpriseAIHelpdesk.Domain/"]
COPY ["EnterpriseAIHelpdesk.Infrastructure/EnterpriseAIHelpdesk.Infrastructure.csproj", "EnterpriseAIHelpdesk.Infrastructure/"]
COPY ["EnterpriseAIHelpdesk.Persistence/EnterpriseAIHelpdesk.Persistence.csproj", "EnterpriseAIHelpdesk.Persistence/"]

RUN dotnet restore "EnterpriseAIHelpdesk.API/EnterpriseAIHelpdesk.API.csproj"

COPY . .

WORKDIR "/src/EnterpriseAIHelpdesk.API"

RUN dotnet publish "EnterpriseAIHelpdesk.API.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "EnterpriseAIHelpdesk.API.dll"]