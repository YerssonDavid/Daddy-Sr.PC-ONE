package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.port.out.assistant.ITavilySearchTools;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Component
public class TavilySearchToolsAdapter implements ITavilySearchTools {

    private final RestClient restClient;

    public TavilySearchToolsAdapter(RestClient.Builder restClient) {
        this.restClient = restClient
                .baseUrl("https://api.tavily.com")
                .build();
    }

    //Get API Key
    @Value("${tavily.api-key}")
    private String apiKeyTavily;

    @Tool(description = "Searches the web for current information about of PC")
    @Override
    public String search(@ToolParam(description = "Consulta de búsqueda en lenguaje natural") String query) {

        try {
            Map<String, Object> requestBody = Map.of(
                    "api_key", apiKeyTavily,
                    "query", query,
                    "search_depth", "basic",
                    "max_results", 5
            );

            Map response = restClient.post()
                    .uri("/search")
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");

            if (results == null || results.isEmpty()) {
                return "No se encontraron resultados.";
            }

            StringBuilder sb = new StringBuilder("Resultados de Tavily:\n\n");
            for (Map<String, Object> r : results) {
                sb.append("• Título: ").append(r.get("title")).append("\n");
                sb.append("  URL: ").append(r.get("url")).append("\n");
                sb.append("  Contenido: ").append(r.get("content")).append("\n\n");
            }

            return sb.toString();

        } catch (Exception e) {
            return "Error en la búsqueda Tavily: " + e.getMessage();
        }
    }
}
