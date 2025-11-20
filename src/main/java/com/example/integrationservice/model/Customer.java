package com.example.integrationservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Domain model representing a Customer
 * Equivalent to MuleSoft DataWeave payload structure
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Customer {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Integer age;
    private String gender;
    private String birthDate;
    private String image;
    private String bloodGroup;
    private Double height;
    private Double weight;
    private String eyeColor;
    private String hair;
    private String username;
    private Address address;
    private Company company;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Address {
        private String address;
        private String city;
        private String state;
        private String stateCode;
        private String postalCode;
        private Coordinates coordinates;
        private String country;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Coordinates {
            private Double lat;
            private Double lng;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Company {
        private String department;
        private String name;
        private String title;
        private Address address;
    }
}
