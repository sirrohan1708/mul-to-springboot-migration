package com.example.integrationservice.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

/**
 * Kafka Configuration
 * Equivalent to MuleSoft Connector Configuration
 */
@Configuration
public class KafkaConfig {

    public static final String CUSTOMER_EVENTS_TOPIC = "customer-events";

    /**
     * Create Kafka topic if it doesn't exist
     * Equivalent to MuleSoft VM Queue or JMS Queue configuration
     */
    @Bean
    public NewTopic customerEventsTopic() {
        return TopicBuilder.name(CUSTOMER_EVENTS_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}
