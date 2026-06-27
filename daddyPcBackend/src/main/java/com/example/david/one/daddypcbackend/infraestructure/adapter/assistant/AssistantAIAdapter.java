package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIClient;
import com.example.david.one.daddypcbackend.infraestructure.web.in.assitant.dto.SystemPromptAgent;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class AssistantAIAdapter implements IAssistantAIClient {

    private final ChatClient chatClient;

    public AssistantAIAdapter(ChatClient.Builder chatClientBuilder, ChatMemory chatMemory) {
        this.chatClient = chatClientBuilder
                .defaultSystem(SystemPromptAgent.getPrompt())
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .build();
    }

    private static final String THINK_OPEN = "<think>";
    private static final String THINK_CLOSE = "</think>";

    @Override
    public Flux<String> ask(String question, String conversationId) {
        AtomicBoolean answerStarted = new AtomicBoolean(false);
        StringBuilder buffer = new StringBuilder();

        return chatClient.prompt()
                .user(question)
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))
                .stream()
                .content()
                .mapNotNull(chunk -> stripReasoning(chunk, buffer, answerStarted));
    }

    /**
     * Filtra el bloque de razonamiento (<think>...</think>) del stream.
     * Mantiene estado entre chunks porque las etiquetas pueden partirse.
     */
    private String stripReasoning(String chunk, StringBuilder buffer, AtomicBoolean answerStarted) {
        if (answerStarted.get()) {
            return chunk;
        }

        buffer.append(chunk);
        String acc = buffer.toString();
        String leading = acc.stripLeading();

        // No hay bloque de razonamiento: el contenido no empieza por <think>
        if (!leading.isEmpty() && !THINK_OPEN.startsWith(leading) && !leading.startsWith(THINK_OPEN)) {
            answerStarted.set(true);
            buffer.setLength(0);
            return acc;
        }

        // Estamos dentro del razonamiento: esperamos a que cierre
        int close = acc.indexOf(THINK_CLOSE);
        if (close >= 0) {
            answerStarted.set(true);
            buffer.setLength(0);
            String answer = acc.substring(close + THINK_CLOSE.length()).stripLeading();
            return answer.isEmpty() ? null : answer;
        }

        // Aún acumulando (razonamiento o etiqueta parcial): no emitimos nada
        return null;
    }
}
