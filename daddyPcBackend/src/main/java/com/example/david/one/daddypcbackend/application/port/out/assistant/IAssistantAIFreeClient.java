package com.example.david.one.daddypcbackend.application.port.out.assistant;

import com.example.david.one.daddypcbackend.application.command.assistant.QuestionToAssistantTestCommand;

public interface IAssistantAIFreeClient {
    String askQuestion(QuestionToAssistantTestCommand command);
}
