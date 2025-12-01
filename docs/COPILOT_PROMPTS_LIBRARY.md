# GitHub Copilot Prompt Library for MuleSoft Migration

## Purpose

This library provides ready-to-use GitHub Copilot prompts for common MuleSoft to Spring Boot migration scenarios. Copy and paste these prompts into your IDE to accelerate development with consistent, high-quality code generation.

## Usage Instructions

1. Open the relevant Java file in VS Code with GitHub Copilot enabled
2. Copy the appropriate prompt from this library
3. Paste as a comment in your code
4. Let Copilot generate the implementation
5. Review and refine the generated code
6. Run tests to validate functionality

---

## REST Controller Prompts

### Basic REST Controller

```java
// Create REST controller for [RESOURCE_NAME]:
// - Base path: /api/[resource]
// - GET endpoint to list all [resources]
// - GET endpoint to fetch by ID
// - POST endpoint to create new [resource]
// - PUT endpoint to update existing [resource]
// - DELETE endpoint to remove [resource]
// - Include @Valid for request validation
// - Return ResponseEntity with appropriate HTTP status
// - Add logging for all operations
// - Include error handling
// - MuleSoft equivalent: HTTP Listener + Flow orchestration
```

### REST Controller with Pagination

```java
// Create paginated REST controller for [RESOURCE_NAME]:
// - GET /api/[resource] with pagination parameters (page, size, sort)
// - Return Page<[Resource]> wrapped in ResponseEntity
// - Add @PageableDefault for default values
// - Include logging for pagination parameters
// - MuleSoft equivalent: HTTP Listener with collection processing
```

---

## Service Layer Prompts

### Service Orchestration

```java
// Create service class for [BUSINESS_OPERATION]:
// - Inject dependencies: [list required beans]
// - Orchestrate workflow: [describe steps]
// - Add @Transactional for database operations
// - Include retry logic for external calls (@Retryable, 3 attempts, 1000ms backoff)
// - Log each workflow step
// - Handle exceptions and map to business errors
// - MuleSoft equivalent: [Flow Name]
```

### Async Service with Kafka

```java
// Create async service to publish events:
// - Topic name: [topic-name]
// - Message format: [describe payload]
// - Use KafkaTemplate for publishing
// - Add @Async annotation
// - Log publish success/failure
// - Handle serialization errors
// - Return CompletableFuture<SendResult>
// - MuleSoft equivalent: VM/JMS Publisher
```

---

## Data Transformation Prompts

### Simple Mapper

```java
// Create mapper class to transform [Source] to [Target]:
// - Map [source.field1] to [target.field1]
// - Map [source.field2] to [target.field2]
// - Concatenate [source.firstName] + [source.lastName] to [target.fullName]
// - Extract [nested.field] to [target.field]
// - Add null checks for optional fields
// - Include builder pattern for target object
// - Add JavaDoc explaining transformation logic
// - MuleSoft equivalent: DataWeave transformation
```

### Complex Business Logic Mapper

```java
// Create mapper with business rules:
// - Transform [Source] entity to [Target] DTO
// - Apply business rule: if [condition] then [value1] else [value2]
// - Calculate derived field: [describe calculation]
// - Format date field to ISO-8601 string
// - Convert enum values: [source enum] to [target enum]
// - Handle null/empty collections gracefully
// - Add helper methods for complex logic
// - Include comprehensive unit tests
// - MuleSoft equivalent: DataWeave with business logic
```

---

## External API Client Prompts

### WebClient (Reactive)

```java
// Create WebClient for external API integration:
// - Base URL: [https://api.example.com]
// - Endpoint: [HTTP_METHOD] /[path]
// - Path variables: [list variables]
// - Request headers: [list headers]
// - Add retry logic: 3 attempts, exponential backoff
// - Handle 4xx and 5xx errors differently
// - Return Mono<[ResponseType]> for reactive processing
// - Add circuit breaker with @CircuitBreaker (fallback method)
// - Log request/response details
// - MuleSoft equivalent: HTTP Request connector
```

### RestTemplate (Blocking)

```java
// Create RestTemplate client for [API_NAME]:
// - Base URL: [url]
// - Configure timeout: connect 5s, read 10s
// - Add custom error handler
// - Include retry interceptor
// - Log all HTTP interactions
// - Handle connection exceptions
// - MuleSoft equivalent: HTTP Connector (sync)
```

---

## Database Access Prompts

### Spring Data JPA Repository

```java
// Create JPA repository for [Entity]:
// - Extend JpaRepository<[Entity], [IdType]>
// - Add custom query methods:
//   - findBy[Field]([type] [param])
//   - findAllBy[Field]Between([type] start, [type] end)
//   - countBy[Field]([type] [param])
// - Add native query for complex search: [describe query]
// - Include @Query annotation with JPQL
// - Add pagination support with Pageable parameter
// - MuleSoft equivalent: Database connector with SELECT operation
```

### Custom Database Query

```java
// Create custom repository implementation:
// - Use EntityManager for dynamic queries
// - Build CriteriaQuery for [describe criteria]
// - Support dynamic filtering on [list fields]
// - Add sorting capability
// - Handle null filter values
// - Return List<[Entity]> or Page<[Entity]>
// - MuleSoft equivalent: Database connector with parameterized query
```

---

## Configuration Prompts

### Application Properties

```java
// Create @ConfigurationProperties class for [module]:
// - Prefix: [app.module]
// - Properties: [list properties with types]
// - Add @Validated for JSR-303 validation
// - Include nested configuration classes if needed
// - Provide default values via @DefaultValue
// - Add JavaDoc for each property
// - MuleSoft equivalent: Connector configuration
```

### Bean Configuration

```java
// Create @Configuration class for [purpose]:
// - Define @Bean methods for [list beans]
// - Configure [component] with custom settings
// - Add conditional bean creation with @ConditionalOn[Condition]
// - Include @Profile for environment-specific beans
// - Set up connection pooling if applicable
// - MuleSoft equivalent: Global configuration elements
```

---

## Error Handling Prompts

### Global Exception Handler

```java
// Create global exception handler with @RestControllerAdvice:
// - Handle [CustomException] -> return 400 with error details
// - Handle [NotFoundException] -> return 404 with message
// - Handle [ValidationException] -> return 422 with field errors
// - Handle [ExternalApiException] -> return 502 with retry indication
// - Handle generic Exception -> return 500 with correlation ID
// - Include @ExceptionHandler methods for each exception type
// - Return ProblemDetail or custom ErrorResponse
// - Log exceptions with appropriate level (error/warn)
// - Add correlation ID for tracing
// - MuleSoft equivalent: Error Handler in flows
```

---

## Testing Prompts

### Unit Test

```java
// Generate unit tests for [ClassName].[methodName]:
// - Test happy path with valid inputs
// - Test edge cases: [list specific cases]
// - Test null/empty parameter handling
// - Test exception scenarios: [list exceptions]
// - Mock dependencies: [list mocks needed]
// - Use @Mock and @InjectMocks annotations
// - Assert all response fields
// - Verify mock interactions with verify()
// - Aim for 95%+ code coverage
// - Use descriptive @DisplayName for each test
```

### Integration Test

```java
// Create integration test for [Controller/Service]:
// - Use @SpringBootTest for full context
// - Use MockMvc for HTTP request testing
// - Test all endpoints: GET, POST, PUT, DELETE
// - Verify response status codes
// - Validate JSON response structure
// - Test authentication/authorization if applicable
// - Use @DirtiesContext if modifying database
// - Include test data setup with @BeforeEach
// - Clean up test data with @AfterEach
```

---

## Kafka Integration Prompts

### Kafka Producer

```java
// Create Kafka producer for [event type]:
// - Topic name: [topic-name]
// - Key type: [String/Long/Custom]
// - Value type: [EventClass]
// - Configure KafkaTemplate<[Key], [Value]>
// - Add ProducerRecord with headers (correlation-id, timestamp)
// - Implement error handling with ListenableFutureCallback
// - Log successful/failed publishes
// - Add metrics for monitoring
// - MuleSoft equivalent: VM/JMS Publish operation
```

### Kafka Consumer

```java
// Create Kafka consumer for [topic]:
// - Topic name: [topic-name]
// - Consumer group: [group-id]
// - Use @KafkaListener annotation
// - Deserialize to [MessageClass]
// - Process message: [describe processing]
// - Add error handling with @KafkaListener(errorHandler)
// - Implement dead letter queue for failed messages
// - Add logging for received messages
// - Include idempotency check if needed
// - MuleSoft equivalent: JMS Listener
```

---

## Security Prompts

### Spring Security Configuration

```java
// Create Spring Security configuration:
// - Enable HTTP Basic authentication
// - Configure authorization rules: [list rules]
// - Permit public endpoints: [list paths]
// - Require authentication for /api/**
// - Add CORS configuration
// - Configure CSRF protection (enable/disable based on [criteria])
// - Set up password encoder (BCrypt)
// - Define UserDetailsService
// - MuleSoft equivalent: Security policies
```

---

## Validation Prompts

### Request Validation

```java
// Create request DTO with validation:
// - Field: [fieldName] - required, [constraints]
// - Field: [fieldName] - email format
// - Field: [fieldName] - min/max length
// - Field: [fieldName] - numeric range [min-max]
// - Field: [fieldName] - pattern validation
// - Use annotations: @NotNull, @NotBlank, @Email, @Size, @Min, @Max, @Pattern
// - Add custom validator if needed
// - Include error messages
// - MuleSoft equivalent: Validation component
```

---

## Documentation Prompts

### API Documentation (OpenAPI)

```java
// Add OpenAPI/Swagger annotations to [Controller]:
// - @Tag for controller-level description
// - @Operation for each endpoint with summary and description
// - @ApiResponse for success responses (200, 201)
// - @ApiResponse for error responses (400, 404, 500)
// - @Parameter for path/query parameters
// - @RequestBody for POST/PUT body description
// - Include example values
// - Document all error scenarios
```

### JavaDoc

```java
// Generate comprehensive JavaDoc for [ClassName]:
// - Class-level description explaining purpose
// - Document all public methods with:
//   - Description of functionality
//   - @param tags for all parameters
//   - @return tag describing return value
//   - @throws tags for checked exceptions
// - Include usage examples in @code blocks
// - Add @see references to related classes
// - Document any MuleSoft equivalencies
```

---

## Monitoring and Observability Prompts

### Actuator Custom Endpoint

```java
// Create custom Actuator endpoint:
// - Endpoint ID: [endpoint-name]
// - Implement @Endpoint annotation
// - Add @ReadOperation for GET
// - Return custom health/status information
// - Include application-specific metrics
// - Format response as JSON
// - MuleSoft equivalent: Custom monitoring connector
```

### Micrometer Metrics

```java
// Add Micrometer metrics to [Service/Controller]:
// - Counter for [operation] invocations
// - Timer for [operation] execution duration
// - Gauge for [resource] availability
// - Inject MeterRegistry
// - Tag metrics with [relevant dimensions]
// - Log metric values periodically
// - MuleSoft equivalent: Flow metrics
```

---

## Utility Prompts

### Date/Time Utilities

```java
// Create utility class for date/time operations:
// - Parse ISO-8601 string to LocalDateTime
// - Format LocalDateTime to custom pattern
// - Calculate duration between two timestamps
// - Add/subtract days/hours from date
// - Convert between time zones
// - Handle parsing errors gracefully
```

### JSON Utilities

```java
// Create JSON utility class using Jackson:
// - Serialize object to JSON string
// - Deserialize JSON string to object
// - Handle Optional fields
// - Configure ObjectMapper with custom settings
// - Add error handling for malformed JSON
// - Support pretty printing for logging
```

---

## Tips for Effective Prompts

1. **Be Specific**: Include exact class names, field names, and business rules
2. **Provide Context**: Mention MuleSoft equivalents to help Copilot understand intent
3. **List Requirements**: Explicitly state logging, error handling, and validation needs
4. **Specify Patterns**: Mention design patterns (Builder, Strategy, etc.) if needed
5. **Include Tests**: Request test generation alongside implementation
6. **Iterate**: Refine prompts based on generated output quality

## Customization

Copy this library to your project and customize prompts based on:
- Your organization's coding standards
- Specific technology stack versions
- Custom frameworks or libraries
- Team naming conventions
- Compliance requirements

## Feedback Loop

Track prompt effectiveness:
- Time saved per prompt type
- Code quality of generated output
- Revisions needed after generation
- Developer satisfaction ratings

Continuously refine prompts based on team feedback and actual results.
