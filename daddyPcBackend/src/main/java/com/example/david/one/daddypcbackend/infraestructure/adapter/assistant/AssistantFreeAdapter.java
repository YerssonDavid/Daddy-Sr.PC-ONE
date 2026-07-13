package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIFreeClient;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgentFree;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Component;

@Component
public class AssistantFreeAdapter implements IAssistantAIFreeClient {

    private final TavilySearchToolsAdapter tavilySearchToolsAdapter;
    private final ChatClient chatClient;

    public AssistantFreeAdapter(TavilySearchToolsAdapter tavilySearchToolsAdapter, ChatClient.Builder chatClient) {
        this.tavilySearchToolsAdapter = tavilySearchToolsAdapter;
        this.chatClient = chatClient.defaultOptions(OpenAiChatOptions.builder()
                .model("Qwen/Qwen3-8B")
                .maxTokens(4096)
                .temperature(0.3))
                .defaultSystem(SystemPromptAgentFree.getPrompt())
                .build();
    }

    @Override
    public String askQuestion(QuestionToAssistantTestCommand command) {
        try {
            return chatClient.prompt()
                    .user(command.question())
                    .tools(tavilySearchToolsAdapter)
                    .call()
                    .content();
        } catch (RuntimeException e) {
            if (isToolCallError(e)) {
                return "Lo siento, ocurrió un error al procesar la respuesta del asistente. Por favor, intenta reformular tu pregunta.";
            }
            throw e;
        }
    }

    private boolean isToolCallError(Throwable e) {
        if (e.getMessage() == null) {
            return false;
        }
        String msg = e.getMessage();
        if (msg.contains("Conversion from JSON") || msg.contains("toolName cannot be null")) {
            return true;
        }
        Throwable cause = e.getCause();
        if (cause != null && cause.getMessage() != null) {
            msg = cause.getMessage();
            return msg.contains("Conversion from JSON") || msg.contains("toolName cannot be null");
        }
        return false;
    }
}
