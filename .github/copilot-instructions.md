# Copilot Instructions for MuleSoft to Spring Boot Migration

## Project Overview
This is a Spring Boot 3.3+ microservice that demonstrates migration from MuleSoft integration patterns to modern Spring Boot architecture.

## Key Technologies
- Spring Boot 3.3.5
- Spring WebFlux (for reactive REST calls)
- Spring Kafka (for messaging)
- Spring Retry (for resilience)
- Spring Boot Actuator (for monitoring)
- Lombok (for boilerplate reduction)
- Maven (build tool)

## Code Style Guidelines

### MuleSoft Equivalency Comments
When adding or modifying code, include comments that map to MuleSoft concepts:
```java
// Equivalent to MuleSoft Flow
// MuleSoft HTTP Listener → @RestController
// MuleSoft Connector → WebClient
// MuleSoft Transformer → Java transformation logic
// MuleSoft Logger → Slf4j logging
```

### Logging Format
Use emoji-based structured logging to mirror MuleSoft's visual flow:
- 🌊 Flow start/end
- 📍 Flow steps
- 🔌 Connector operations
- 🔄 Transformations
- 📤 Publishing/sending
- ✅ Success messages
- ❌ Error messages

### Error Handling
- Use `@Retryable` for transient failures
- Map Spring exceptions to MuleSoft error types
- Include MuleSoft equivalent error type in comments

### Service Layer
- Keep transformation logic in service classes
- Document DataWeave equivalents
- Use clear method names that indicate purpose

### Configuration
- Use `application.yml` for configuration
- Group related properties
- Document MuleSoft connector config equivalents

## Testing
- Write unit tests for all service methods
- Mock external dependencies
- Test error scenarios and retry logic
- Verify transformation logic

## When Suggesting Changes
1. Maintain MuleSoft mapping comments
2. Follow the established logging pattern
3. Consider retry and error handling
4. Keep reactive programming patterns where applicable
5. Document any new Spring Boot features that replace MuleSoft components
