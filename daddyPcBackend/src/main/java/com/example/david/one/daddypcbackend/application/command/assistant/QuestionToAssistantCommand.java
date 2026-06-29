package com.example.david.one.daddypcbackend.application.command.assistant;

public record QuestionToAssistantCommand(
        String questionAi,
        String conversationId) {}
