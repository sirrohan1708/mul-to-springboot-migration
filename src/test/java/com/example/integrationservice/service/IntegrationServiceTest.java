package com.example.integrationservice.service;

import com.example.integrationservice.client.ExternalApiClient;
import com.example.integrationservice.model.Customer;
import com.example.integrationservice.model.CustomerResponse;
import com.example.integrationservice.producer.CustomerEventProducer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IntegrationServiceTest {

    @Mock
    private ExternalApiClient externalApiClient;

    @Mock
    private CustomerEventProducer customerEventProducer;

    @InjectMocks
    private IntegrationService integrationService;

    private Customer mockCustomer;

    @BeforeEach
    void setUp() {
        mockCustomer = new Customer();
        mockCustomer.setId(1L);
        mockCustomer.setFirstName("John");
        mockCustomer.setLastName("Doe");
        mockCustomer.setEmail("john.doe@example.com");
        mockCustomer.setPhone("+1-555-0100");
        mockCustomer.setAge(35);

        Customer.Address address = new Customer.Address();
        address.setCity("New York");
        address.setState("NY");
        mockCustomer.setAddress(address);

        Customer.Company company = new Customer.Company();
        company.setName("Tech Corp");
        company.setTitle("Software Engineer");
        mockCustomer.setCompany(company);
    }

    @Test
    void testProcessCustomer_Success() {
        // Arrange
        when(externalApiClient.getCustomerById(anyLong())).thenReturn(mockCustomer);
        doNothing().when(customerEventProducer).publishCustomerEvent(any(CustomerResponse.class));

        // Act
        CustomerResponse response = integrationService.processCustomer(1L);

        // Assert
        assertNotNull(response);
        assertEquals(1L, response.getCustomerId());
        assertEquals("John Doe", response.getFullName());
        assertEquals("john.doe@example.com", response.getEmail());
        assertEquals("+1-555-0100", response.getPhoneNumber());
        assertEquals(35, response.getCustomerAge());
        assertEquals("New York, NY", response.getLocation());
        assertEquals("Tech Corp", response.getCompanyName());
        assertEquals("Software Engineer", response.getJobTitle());
        assertEquals("Silver", response.getLoyaltyScore()); // Age 35 = Silver
        assertEquals("SUCCESS", response.getStatus());

        verify(externalApiClient, times(1)).getCustomerById(1L);
        verify(customerEventProducer, times(1)).publishCustomerEvent(any(CustomerResponse.class));
    }

    @Test
    void testProcessCustomer_ExternalApiFailure() {
        // Arrange
        when(externalApiClient.getCustomerById(anyLong()))
                .thenThrow(new RuntimeException("External API error"));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            integrationService.processCustomer(1L);
        });

        verify(externalApiClient, times(1)).getCustomerById(1L);
        verify(customerEventProducer, never()).publishCustomerEvent(any());
    }

    @Test
    void testLoyaltyScoreCalculation_Bronze() {
        // Arrange
        mockCustomer.setAge(20);
        when(externalApiClient.getCustomerById(anyLong())).thenReturn(mockCustomer);

        // Act
        CustomerResponse response = integrationService.processCustomer(1L);

        // Assert
        assertEquals("Bronze", response.getLoyaltyScore());
    }

    @Test
    void testLoyaltyScoreCalculation_Gold() {
        // Arrange
        mockCustomer.setAge(50);
        when(externalApiClient.getCustomerById(anyLong())).thenReturn(mockCustomer);

        // Act
        CustomerResponse response = integrationService.processCustomer(1L);

        // Assert
        assertEquals("Gold", response.getLoyaltyScore());
    }

    @Test
    void testLoyaltyScoreCalculation_Platinum() {
        // Arrange
        mockCustomer.setAge(65);
        when(externalApiClient.getCustomerById(anyLong())).thenReturn(mockCustomer);

        // Act
        CustomerResponse response = integrationService.processCustomer(1L);

        // Assert
        assertEquals("Platinum", response.getLoyaltyScore());
    }
}
