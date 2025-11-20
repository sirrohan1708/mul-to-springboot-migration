package com.example.integrationservice.controller;

import com.example.integrationservice.model.CustomerResponse;
import com.example.integrationservice.service.IntegrationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller - API endpoints
 * Equivalent to MuleSoft HTTP Listener
 * 
 * Maps to MuleSoft concepts:
 * - HTTP Listener → @RestController and @RequestMapping
 * - Path parameters → @PathVariable
 * - HTTP methods → @GetMapping, @PostMapping
 * - Response builder → ResponseEntity
 */
@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class IntegrationController {

    private final IntegrationService integrationService;

    /**
     * Get customer by ID and process through integration flow
     * 
     * MuleSoft equivalent:
     * <http:listener path="/api/customer/{id}" method="GET"/>
     * 
     * @param id Customer ID from path parameter
     * @return Processed customer response
     */
    @GetMapping("/customer/{id}")
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable("id") Long id) {
        log.info("📨 [MuleSoft HTTP Listener] Received request for customer ID: {}", id);
        
        try {
            CustomerResponse response = integrationService.processCustomer(id);
            
            log.info("📨 [MuleSoft HTTP Listener] Sending response with status 200 OK");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("📨 [MuleSoft HTTP Listener] Sending error response: {}", e.getMessage());
            throw e; // Let GlobalExceptionHandler handle it
        }
    }

    /**
     * Health check endpoint
     * 
     * MuleSoft equivalent:
     * <http:listener path="/api/status" method="GET"/>
     * 
     * @return Service status and dependencies health
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        log.info("📨 [MuleSoft HTTP Listener] Health check request received");
        
        Map<String, Object> status = Map.of(
                "service", "integration-service",
                "status", "UP",
                "timestamp", System.currentTimeMillis(),
                "description", "MuleSoft to Spring Boot Migration Prototype"
        );
        
        return ResponseEntity.ok(status);
    }

    /**
     * API info endpoint
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getInfo() {
        Map<String, Object> info = Map.of(
                "name", "Integration Service",
                "description", "MuleSoft to Spring Boot Migration Prototype",
                "version", "1.0.0",
                "endpoints", Map.of(
                        "getCustomer", "GET /api/customer/{id}",
                        "status", "GET /api/status",
                        "health", "GET /actuator/health"
                ),
                "mulesoft-equivalents", Map.of(
                        "flow", "IntegrationService",
                        "httpListener", "IntegrationController",
                        "httpConnector", "ExternalApiClient",
                        "transformer", "transformCustomerData()",
                        "vmPublish", "CustomerEventProducer",
                        "logger", "log statements throughout"
                )
        );
        
        return ResponseEntity.ok(info);
    }
}
