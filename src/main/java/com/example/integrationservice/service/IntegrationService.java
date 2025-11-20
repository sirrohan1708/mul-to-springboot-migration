package com.example.integrationservice.service;

import com.example.integrationservice.client.ExternalApiClient;
import com.example.integrationservice.mapper.CustomerMapper;
import com.example.integrationservice.model.Customer;
import com.example.integrationservice.model.CustomerResponse;
import com.example.integrationservice.producer.CustomerEventProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * Integration Service - Core business logic
 * Equivalent to MuleSoft Flow with DataWeave transformations
 * 
 * Maps to MuleSoft concepts:
 * - MuleSoft Flow → Service method orchestrating the entire flow
 * - DataWeave Transform → CustomerMapper (separate mapper class)
 * - Flow steps → Method calls with logging
 * - Variables → Method local variables
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class IntegrationService {

    private final ExternalApiClient externalApiClient;
    private final CustomerEventProducer customerEventProducer;
    private final CustomerMapper customerMapper;

    /**
     * Main integration flow
     * 
     * MuleSoft Flow equivalent:
     * 1. HTTP Listener (entry point)
     * 2. HTTP Request (fetch data)
     * 3. DataWeave Transform (transform data)
     * 4. VM Publish / JMS Send (publish to queue)
     * 5. Logger (log results)
     * 6. Return response
     * 
     * @param customerId Customer ID from request
     * @return Transformed customer response
     */
    public CustomerResponse processCustomer(Long customerId) {
        log.info("🌊 [MuleSoft Flow START] Processing customer ID: {}", customerId);
        
        try {
            // Step 1: Fetch customer data from external API
            // Equivalent to MuleSoft HTTP Request Connector
            log.info("📍 [MuleSoft Flow - Step 1] Calling external API...");
            Customer customer = externalApiClient.getCustomerById(customerId);
            
            // Step 2: Transform the data
            // Equivalent to MuleSoft DataWeave Transformer
            log.info("📍 [MuleSoft Flow - Step 2] Transforming customer data using CustomerMapper (DataWeave equivalent)...");
            CustomerResponse transformedCustomer = customerMapper.toCustomerResponse(customer);
            
            // Step 3: Publish to Kafka
            // Equivalent to MuleSoft VM Publish or JMS Send
            log.info("📍 [MuleSoft Flow - Step 3] Publishing to Kafka topic...");
            customerEventProducer.publishCustomerEvent(transformedCustomer);
            
            // Step 4: Log success
            // Equivalent to MuleSoft Logger component
            log.info("✅ [MuleSoft Logger] Successfully processed customer: {}", 
                    transformedCustomer.getFullName());
            log.info("🌊 [MuleSoft Flow END] Completed processing for customer ID: {}", customerId);
            
            return transformedCustomer;
            
        } catch (Exception e) {
            // Equivalent to MuleSoft Error Handler
            log.error("❌ [MuleSoft Error Handler] Error in flow for customer {}: {}", 
                    customerId, e.getMessage(), e);
            throw new RuntimeException("Integration flow failed for customer " + customerId, e);
        }
    }
}
