package com.example.integrationservice.service;

import com.example.integrationservice.client.ExternalApiClient;
import com.example.integrationservice.model.Customer;
import com.example.integrationservice.model.CustomerResponse;
import com.example.integrationservice.producer.CustomerEventProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Integration Service - Core business logic
 * Equivalent to MuleSoft Flow with DataWeave transformations
 * 
 * Maps to MuleSoft concepts:
 * - MuleSoft Flow → Service method orchestrating the entire flow
 * - DataWeave Transform → transformCustomerData() method
 * - Flow steps → Method calls with logging
 * - Variables → Method local variables
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class IntegrationService {

    private final ExternalApiClient externalApiClient;
    private final CustomerEventProducer customerEventProducer;

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
            log.info("📍 [MuleSoft Flow - Step 2] Transforming customer data...");
            CustomerResponse transformedCustomer = transformCustomerData(customer);
            
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

    /**
     * Transform customer data to response format
     * 
     * Equivalent to MuleSoft DataWeave transformation:
     * %dw 2.0
     * output application/json
     * ---
     * {
     *   customerId: payload.id,
     *   fullName: payload.firstName ++ " " ++ payload.lastName,
     *   email: payload.email,
     *   phoneNumber: payload.phone,
     *   customer_age: payload.age,
     *   location: payload.address.city ++ ", " ++ payload.address.state,
     *   companyName: payload.company.name,
     *   jobTitle: payload.company.title,
     *   loyaltyScore: calculateLoyaltyScore(payload.age),
     *   processedAt: now(),
     *   status: "SUCCESS"
     * }
     * 
     * @param customer Raw customer data
     * @return Transformed customer response
     */
    private CustomerResponse transformCustomerData(Customer customer) {
        log.info("🔄 [MuleSoft Transformer] Applying DataWeave transformation...");
        
        // Build location string
        String location = buildLocationString(customer);
        
        // Calculate derived field - loyalty score
        String loyaltyScore = calculateLoyaltyScore(customer.getAge());
        
        CustomerResponse response = CustomerResponse.builder()
                .customerId(customer.getId())
                .fullName(customer.getFirstName() + " " + customer.getLastName())
                .email(customer.getEmail())
                .phoneNumber(customer.getPhone())
                .customerAge(customer.getAge())
                .location(location)
                .companyName(customer.getCompany() != null ? customer.getCompany().getName() : "N/A")
                .jobTitle(customer.getCompany() != null ? customer.getCompany().getTitle() : "N/A")
                .loyaltyScore(loyaltyScore)
                .processedAt(LocalDateTime.now())
                .status("SUCCESS")
                .build();
        
        log.info("🔄 [MuleSoft Transformer] Transformation complete: {} → loyalty score: {}", 
                response.getFullName(), loyaltyScore);
        
        return response;
    }

    /**
     * Helper method to build location string
     */
    private String buildLocationString(Customer customer) {
        if (customer.getAddress() != null) {
            String city = customer.getAddress().getCity() != null ? customer.getAddress().getCity() : "";
            String state = customer.getAddress().getState() != null ? customer.getAddress().getState() : "";
            
            if (!city.isEmpty() && !state.isEmpty()) {
                return city + ", " + state;
            } else if (!city.isEmpty()) {
                return city;
            } else if (!state.isEmpty()) {
                return state;
            }
        }
        return "Unknown";
    }

    /**
     * Calculate loyalty score based on age
     * Equivalent to MuleSoft custom function in DataWeave
     * 
     * Business logic:
     * - Age < 25: "Bronze"
     * - Age 25-40: "Silver"
     * - Age 41-60: "Gold"
     * - Age > 60: "Platinum"
     */
    private String calculateLoyaltyScore(Integer age) {
        if (age == null) {
            return "Bronze";
        }
        
        if (age < 25) {
            return "Bronze";
        } else if (age <= 40) {
            return "Silver";
        } else if (age <= 60) {
            return "Gold";
        } else {
            return "Platinum";
        }
    }
}
