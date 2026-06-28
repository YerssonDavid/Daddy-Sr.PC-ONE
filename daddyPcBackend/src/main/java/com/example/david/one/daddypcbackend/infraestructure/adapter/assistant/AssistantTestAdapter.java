package com.example.david.one.daddypcbackend.infraestructure.adapter.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;
import com.example.david.one.daddypcbackend.application.port.out.assistant.IAssistantAIFreeClient;
import com.example.david.one.daddypcbackend.infraestructure.dto.asistant.SystemPromptAgentFree;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class AssistantTestAdapter implements IAssistantAIFreeClient {

    private final ChatClient chatClient;

    public AssistantTestAdapter(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.defaultOptions(OpenAiChatOptions.builder()
                .model("openai/gpt-oss-20b")
                .temperature(0.3))
                .defaultSystem(SystemPromptAgentFree.getPrompt())
                .build();
    }

    @Override
    public Flux<String> askQuestion(QuestionToAssistantTestCommand command) {
        return chatClient.prompt()
                .user(command.question())
                .stream()
                .content();
    }
}
