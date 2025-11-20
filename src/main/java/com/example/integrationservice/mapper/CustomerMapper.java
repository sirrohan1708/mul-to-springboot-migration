package com.example.integrationservice.mapper;

import com.example.integrationservice.model.Customer;
import com.example.integrationservice.model.CustomerResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Customer Data Mapper
 * 
 * Equivalent to MuleSoft DataWeave Transformation
 * 
 * MuleSoft DataWeave pattern:
 * %dw 2.0
 * output application/json
 * ---
 * {
 *   customerId: payload.id,
 *   fullName: payload.firstName ++ " " ++ payload.lastName,
 *   loyaltyScore: if(payload.age > 50) "Gold" else if(payload.age > 30) "Silver" else "Bronze",
 *   ...
 * }
 * 
 * This class demonstrates how DataWeave logic can be implemented in Java:
 * - Field mapping and concatenation
 * - Conditional logic (if-else)
 * - Date formatting
 * - Null safety
 * - Type conversion
 * 
 * For complex transformations, consider MapStruct for compile-time safety:
 * https://mapstruct.org/
 */
@Component
public class CustomerMapper {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    /**
     * Transform Customer entity to CustomerResponse DTO
     * 
     * Equivalent to MuleSoft DataWeave transformation
     * 
     * @param customer Source customer data
     * @return Transformed customer response
     */
    public CustomerResponse toCustomerResponse(Customer customer) {
        if (customer == null) {
            return null;
        }

        CustomerResponse response = new CustomerResponse();
        
        // Direct field mapping (MuleSoft: payload.id)
        response.setCustomerId(customer.getId());
        
        // String concatenation (MuleSoft: firstName ++ " " ++ lastName)
        response.setFullName(buildFullName(customer));
        
        // Copy fields with null safety
        response.setEmail(customer.getEmail());
        response.setPhoneNumber(customer.getPhone());
        response.setCustomerAge(customer.getAge());
        response.setLocation(buildLocation(customer));
        response.setCompanyName(customer.getCompany() != null ? customer.getCompany().getName() : "N/A");
        response.setJobTitle(customer.getCompany() != null ? customer.getCompany().getTitle() : "N/A");
        
        // Conditional logic (MuleSoft: if-else)
        response.setLoyaltyScore(calculateLoyaltyScore(customer.getAge()));
        
        // Date formatting (MuleSoft: now() as String {format: "yyyy-MM-dd'T'HH:mm:ss"})
        response.setProcessedAt(LocalDateTime.now());
        
        // Status enrichment
        response.setStatus("SUCCESS");
        
        return response;
    }

    /**
     * Build full name from first and last name
     * 
     * MuleSoft DataWeave equivalent:
     * firstName ++ " " ++ lastName
     */
    private String buildFullName(Customer customer) {
        StringBuilder fullName = new StringBuilder();
        
        if (customer.getFirstName() != null) {
            fullName.append(customer.getFirstName());
        }
        
        if (customer.getLastName() != null) {
            if (fullName.length() > 0) {
                fullName.append(" ");
            }
            fullName.append(customer.getLastName());
        }
        
        return fullName.length() > 0 ? fullName.toString() : "Unknown";
    }

    /**
     * Build location string from address components
     * 
     * MuleSoft DataWeave equivalent:
     * address.city ++ ", " ++ address.state
     */
    private String buildLocation(Customer customer) {
        if (customer.getAddress() == null) {
            return "Unknown";
        }
        
        String city = customer.getAddress().getCity();
        String state = customer.getAddress().getState();
        
        if (city != null && state != null) {
            return city + ", " + state;
        } else if (city != null) {
            return city;
        } else if (state != null) {
            return state;
        }
        
        return "Unknown";
    }

    /**
     * Calculate loyalty score based on age
     * 
     * MuleSoft DataWeave equivalent:
     * if(payload.age > 50) "Gold"
     * else if(payload.age > 30) "Silver"
     * else "Bronze"
     * 
     * Business rules:
     * - Age > 50: Gold (premium customer)
     * - Age 31-50: Silver (valued customer)
     * - Age ≤ 30: Bronze (standard customer)
     */
    private String calculateLoyaltyScore(Integer age) {
        if (age == null) {
            return "Bronze";
        }
        
        if (age > 50) {
            return "Gold";
        } else if (age > 30) {
            return "Silver";
        } else {
            return "Bronze";
        }
    }

    /**
     * Advanced transformation example: Calculate risk score
     * 
     * This demonstrates more complex business logic that might
     * require multiple DataWeave functions in MuleSoft
     * 
     * @param customer Source customer
     * @return Risk score (0-100)
     */
    public int calculateRiskScore(Customer customer) {
        int score = 50; // Base score
        
        // Age factor
        if (customer.getAge() != null) {
            if (customer.getAge() < 25) {
                score += 20; // Higher risk for young customers
            } else if (customer.getAge() > 60) {
                score -= 10; // Lower risk for senior customers
            }
        }
        
        // Email verification factor
        if (customer.getEmail() == null || !customer.getEmail().contains("@")) {
            score += 15; // No verified email increases risk
        }
        
        // Company affiliation factor
        if (customer.getCompany() != null) {
            score -= 10; // Having company affiliation reduces risk
        }
        
        // Clamp score between 0-100
        return Math.max(0, Math.min(100, score));
    }
}
