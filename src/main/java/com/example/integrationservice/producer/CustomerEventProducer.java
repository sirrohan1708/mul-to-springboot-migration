package com.example.integrationservice.producer;

import com.example.integrationservice.config.KafkaConfig;
import com.example.integrationservice.model.CustomerResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

/**
 * Kafka Producer for publishing customer events
 * Equivalent to MuleSoft VM Publish or JMS Publish
 * 
 * Maps to MuleSoft concepts:
 * - VM Publish / JMS Send → KafkaTemplate.send()
 * - Queue/Topic configuration → Kafka topic
 * - Async publish with callback → CompletableFuture
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CustomerEventProducer {

    private final KafkaTemplate<String, CustomerResponse> kafkaTemplate;

    /**
     * Publish customer event to Kafka topic
     * 
     * MuleSoft equivalent: VM Publish or JMS Send operation
     * - Destination: customer-events queue/topic
     * - Message type: JSON
     * - Acknowledgment: Async with callback
     * 
     * @param customerResponse Transformed customer data to publish
     */
    public void publishCustomerEvent(CustomerResponse customerResponse) {
        String key = String.valueOf(customerResponse.getCustomerId());
        
        log.info("📤 [MuleSoft VM Publish] Publishing event for customer ID: {}", key);
        
        CompletableFuture<SendResult<String, CustomerResponse>> future = 
                kafkaTemplate.send(KafkaConfig.CUSTOMER_EVENTS_TOPIC, key, customerResponse);
        
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                log.info("✅ [MuleSoft VM Publish] Successfully published event for customer {}: partition={}, offset={}", 
                        key,
                        result.getRecordMetadata().partition(),
                        result.getRecordMetadata().offset());
            } else {
                log.error("❌ [MuleSoft Error Handler] Failed to publish event for customer {}: {}", 
                        key, ex.getMessage());
            }
        });
    }

    /**
     * Synchronous publish with error handling
     * Useful when you need to ensure message is sent before proceeding
     */
    public void publishCustomerEventSync(CustomerResponse customerResponse) {
        String key = String.valueOf(customerResponse.getCustomerId());
        
        log.info("📤 [MuleSoft VM Publish - Sync] Publishing event for customer ID: {}", key);
        
        try {
            SendResult<String, CustomerResponse> result = 
                    kafkaTemplate.send(KafkaConfig.CUSTOMER_EVENTS_TOPIC, key, customerResponse)
                            .get(); // Block until complete
            
            log.info("✅ [MuleSoft VM Publish] Successfully published event for customer {}: partition={}, offset={}", 
                    key,
                    result.getRecordMetadata().partition(),
                    result.getRecordMetadata().offset());
        } catch (Exception e) {
            log.error("❌ [MuleSoft Error Handler] Failed to publish event for customer {}: {}", 
                    key, e.getMessage());
            throw new RuntimeException("Failed to publish customer event", e);
        }
    }
}
