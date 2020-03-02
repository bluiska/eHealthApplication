FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /eHealth-DataBus

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /eHealth-DataBus
EXPOSE 80
COPY --from=build-env /eHealth-DataBus/out .
ENTRYPOINT ["dotnet", "eHealth-DataBus.dll"]