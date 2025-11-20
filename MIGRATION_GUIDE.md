# MuleSoft to Spring Boot Migration Guide

## Detailed Component Mapping

### 1. Flow Definition

**MuleSoft:**
```xml
<flow name="customer-flow">
    <http:listener path="/api/customer/{id}" />
    <http:request url="${external.api.url}" />
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
                output application/json
                ---
                {
                    customerId: payload.id,
                    fullName: payload.firstName ++ " " ++ payload.lastName
                }
            ]]></ee:set-payload>
        </ee:message>
    </ee:transform>
    <vm:publish queueName="customer-events" />
    <logger message="Processed customer" />
</flow>
```

**Spring Boot:**
```java
@RestController
public class IntegrationController {
    @GetMapping("/api/customer/{id}")
    public CustomerResponse getCustomer(@PathVariable Long id) {
        return integrationService.processCustomer(id);
    }
}

@Service
public class IntegrationService {
    public CustomerResponse processCustomer(Long customerId) {
        Customer customer = externalApiClient.getCustomerById(customerId);
        CustomerResponse transformed = transformCustomerData(customer);
        customerEventProducer.publishCustomerEvent(transformed);
        log.info("Processed customer");
        return transformed;
    }
}
```

### 2. HTTP Request

**MuleSoft:**
```xml
<http:request-config name="HTTP_Config">
    <http:request-connection host="${api.host}" port="${api.port}"/>
</http:request-config>

<http:request config-ref="HTTP_Config" path="/users/{id}" method="GET"/>
```

**Spring Boot:**
```java
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient(@Value("${external.api.base-url}") String baseUrl) {
        return WebClient.builder().baseUrl(baseUrl).build();
    }
}

@Component
public class ExternalApiClient {
    public Customer getCustomerById(Long id) {
        return webClient.get()
            .uri("/{id}", id)
            .retrieve()
            .bodyToMono(Customer.class)
            .block();
    }
}
```

### 3. DataWeave Transformation

**MuleSoft:**
```dataweave
%dw 2.0
output application/json
---
{
    customerId: payload.id,
    fullName: payload.firstName ++ " " ++ payload.lastName,
    loyaltyScore: if (payload.age > 40) "Gold" else "Silver"
}
```

**Spring Boot:**
```java
private CustomerResponse transformCustomerData(Customer customer) {
    return CustomerResponse.builder()
        .customerId(customer.getId())
        .fullName(customer.getFirstName() + " " + customer.getLastName())
        .loyaltyScore(customer.getAge() > 40 ? "Gold" : "Silver")
        .build();
}
```

### 4. Error Handling

**MuleSoft:**
```xml
<error-handler>
    <on-error-continue type="HTTP:CONNECTIVITY">
        <logger message="Connection error" level="ERROR"/>
    </on-error-continue>
    <on-error-propagate type="ANY">
        <set-payload value="#['Error occurred']"/>
    </on-error-propagate>
</error-handler>
```

**Spring Boot:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<ErrorResponse> handleWebClientException(WebClientResponseException ex) {
        log.error("Connection error: {}", ex.getMessage());
        return ResponseEntity.status(ex.getStatusCode()).body(errorResponse);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Error occurred: {}", ex.getMessage());
        return ResponseEntity.internalServerError().body(errorResponse);
    }
}
```

### 5. Retry Policy

**MuleSoft:**
```xml
<http:request-config>
    <http:request-connection>
        <reconnection>
            <reconnect frequency="1000" count="3"/>
        </reconnection>
    </http:request-connection>
</http:request-config>
```

**Spring Boot:**
```java
@Retryable(
    retryFor = {WebClientResponseException.class},
    maxAttempts = 3,
    backoff = @Backoff(delay = 1000, multiplier = 2)
)
public Customer getCustomerById(Long customerId) {
    return webClient.get().uri("/{id}", customerId).retrieve()
        .bodyToMono(Customer.class).block();
}
```

### 6. VM Queue / JMS

**MuleSoft:**
```xml
<vm:config name="VM_Config">
    <vm:queues>
        <vm:queue queueName="customer-events"/>
    </vm:queues>
</vm:config>

<vm:publish queueName="customer-events" config-ref="VM_Config"/>
```

**Spring Boot:**
```java
@Configuration
public class KafkaConfig {
    @Bean
    public NewTopic customerEventsTopic() {
        return TopicBuilder.name("customer-events")
            .partitions(3)
            .replicas(1)
            .build();
    }
}

@Component
public class CustomerEventProducer {
    private final KafkaTemplate<String, CustomerResponse> kafkaTemplate;
    
    public void publishCustomerEvent(CustomerResponse response) {
        kafkaTemplate.send("customer-events", response);
    }
}
```

## Migration Checklist

- [x] HTTP Listener → @RestController
- [x] HTTP Request Connector → WebClient
- [x] DataWeave Transform → Java methods
- [x] VM Publish → Kafka Producer
- [x] Logger → Slf4j
- [x] Error Handler → @ExceptionHandler
- [x] Retry Policy → @Retryable
- [x] Configuration → application.yml
- [x] Monitoring → Spring Actuator

## Benefits of Spring Boot Approach

1. **Type Safety**: Compile-time checking vs runtime errors
2. **Testing**: Easy to mock and unit test
3. **IDE Support**: Better autocomplete and refactoring
4. **Performance**: Native Java performance
5. **Community**: Larger Spring ecosystem
6. **Cost**: No licensing fees
7. **Cloud Native**: Better Kubernetes integration
8. **Observability**: Rich metrics and tracing options
