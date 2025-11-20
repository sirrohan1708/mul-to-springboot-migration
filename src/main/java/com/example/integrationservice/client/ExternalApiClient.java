package com.example.integrationservice.client;

import com.example.integrationservice.model.Customer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.time.Duration;

/**
 * External API Client for fetching customer data
 * Equivalent to MuleSoft HTTP Request Connector
 * 
 * Maps to MuleSoft concepts:
 * - HTTP Request Connector → WebClient
 * - Connection configuration → WebClientConfig
 * - Error propagation → WebClientResponseException handling
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ExternalApiClient {

    private final WebClient webClient;

    /**
     * Fetch customer by ID from external API
     * 
     * MuleSoft equivalent: HTTP Request operation with path parameters
     * - Path: /users/{id}
     * - Method: GET
     * - Response timeout: 5 seconds
     * - Error handling: Retry on transient failures
     * 
     * @param customerId Customer ID to fetch
     * @return Customer object
     */
    @Retryable(
            retryFor = {WebClientResponseException.class},
            maxAttempts = 3,
            backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    public Customer getCustomerById(Long customerId) {
        log.info("🔌 [MuleSoft Connector] Fetching customer data for ID: {}", customerId);
        
        try {
            Customer customer = webClient.get()
                    .uri("/{id}", customerId)
                    .retrieve()
                    .bodyToMono(Customer.class)
                    .timeout(Duration.ofSeconds(5))
                    .block();
            
            log.info("✅ [MuleSoft Connector] Successfully fetched customer: {} {}", 
                    customer.getFirstName(), customer.getLastName());
            
            return customer;
        } catch (WebClientResponseException e) {
            log.error("❌ [MuleSoft Error Handler] HTTP {} error while fetching customer {}: {}", 
                    e.getStatusCode(), customerId, e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("❌ [MuleSoft Error Handler] Unexpected error while fetching customer {}: {}", 
                    customerId, e.getMessage());
            throw new RuntimeException("Failed to fetch customer data", e);
        }
    }

    /**
     * Async version - returns Mono for reactive streams
     */
    public Mono<Customer> getCustomerByIdAsync(Long customerId) {
        log.info("🔌 [MuleSoft Connector - Async] Fetching customer data for ID: {}", customerId);
        
        return webClient.get()
                .uri("/{id}", customerId)
                .retrieve()
                .bodyToMono(Customer.class)
                .timeout(Duration.ofSeconds(5))
                .doOnSuccess(customer -> log.info("✅ [MuleSoft Connector] Successfully fetched customer: {} {}", 
                        customer.getFirstName(), customer.getLastName()))
                .doOnError(e -> log.error("❌ [MuleSoft Error Handler] Error fetching customer {}: {}", 
                        customerId, e.getMessage()));
    }
}
