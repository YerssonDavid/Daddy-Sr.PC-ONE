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
                .model("deepseek-ai/DeepSeek-V4-Flash")
                .temperature(0.3))
                .defaultSystem(SystemPromptAgentFree.getPrompt())
                .build();
    }

    @Override
    public String askQuestion(QuestionToAssistantTestCommand command) {
        return chatClient.prompt()
                .user(command.question())
                .tools(tavilySearchToolsAdapter)
                .call()
                .content();
    }
}
