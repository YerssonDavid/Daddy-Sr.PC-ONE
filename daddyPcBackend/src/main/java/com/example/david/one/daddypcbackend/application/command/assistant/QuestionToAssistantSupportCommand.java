package com.example.david.one.daddypcbackend.application.command.assistant;

public record QuestionToAssistantSupportCommand (
        String question,
        String conversationId
){

}
