package com.example.integrationservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Transformed customer response payload
 * Equivalent to MuleSoft Transformer output
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private Long customerId;
    private String fullName;
    private String email;
    private String phoneNumber;
    
    @JsonProperty("customer_age")
    private Integer customerAge;
    
    private String location;
    private String companyName;
    private String jobTitle;
    
    // Derived field - similar to MuleSoft computed attributes
    private String loyaltyScore;
    
    private LocalDateTime processedAt;
    private String status;
}
