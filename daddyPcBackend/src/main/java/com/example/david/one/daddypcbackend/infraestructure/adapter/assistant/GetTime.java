package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
@Slf4j
public class GetTime {

    @Value("${time.api}")
    private String api;

    @Tool(description = "Get time now for search in the actually")
    public String getTime() throws IOException, InterruptedException {
        log.warn("Method getTime called");
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://world-time-api3.p.rapidapi.com/ip.txt"))
                .header("x-rapidapi-key", api)
                .header("x-rapidapi-host", "world-time-api3.p.rapidapi.com")
                .header("Content-Type", "application/json")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        log.warn("Response: {}", response.body());
        return response.body();
    }
}
