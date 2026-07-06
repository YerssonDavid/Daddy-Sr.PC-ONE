FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn dependency:go-offline -B
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache ca-certificates && \
    addgroup -S app && adduser -S app -G app && \
    mkdir -p /app && \
    chown -R app:app /app
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
