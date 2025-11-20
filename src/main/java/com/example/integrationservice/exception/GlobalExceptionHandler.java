package com.example.integrationservice.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Global Exception Handler
 * Equivalent to MuleSoft Error Handler and On-Error-Continue/Propagate
 * 
 * Maps to MuleSoft concepts:
 * - Error Handler → @ExceptionHandler methods
 * - On-Error-Continue → Return error response without propagating
 * - On-Error-Propagate → Re-throw exception
 * - Error types → Different exception classes
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle WebClient exceptions (external API errors)
     * 
     * MuleSoft equivalent:
     * <on-error-continue type="HTTP:CONNECTIVITY">
     *   <logger message="External API error"/>
     * </on-error-continue>
     */
    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<Map<String, Object>> handleWebClientException(WebClientResponseException ex) {
        log.error("❌ [MuleSoft Error Handler - HTTP] External API error: {} - {}", 
                ex.getStatusCode(), ex.getMessage());
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", ex.getStatusCode().value());
        errorResponse.put("error", "External API Error");
        errorResponse.put("message", "Failed to fetch data from external service");
        errorResponse.put("details", ex.getResponseBodyAsString());
        errorResponse.put("mulesoft_equivalent", "HTTP:CONNECTIVITY or HTTP:TIMEOUT error");
        
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }

    /**
     * Handle generic runtime exceptions
     * 
     * MuleSoft equivalent:
     * <on-error-propagate type="ANY">
     *   <logger message="Unexpected error in flow"/>
     * </on-error-propagate>
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        log.error("❌ [MuleSoft Error Handler - ANY] Runtime error: {}", ex.getMessage(), ex);
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("mulesoft_equivalent", "ANY error type with on-error-propagate");
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handle illegal argument exceptions (validation errors)
     * 
     * MuleSoft equivalent:
     * <on-error-continue type="VALIDATION:INVALID_VALUE">
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error("❌ [MuleSoft Error Handler - VALIDATION] Validation error: {}", ex.getMessage());
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());
        errorResponse.put("error", "Bad Request");
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("mulesoft_equivalent", "VALIDATION:INVALID_VALUE error");
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle all other exceptions
     * 
     * MuleSoft equivalent:
     * <on-error-propagate type="ANY">
     *   <logger level="ERROR" message="Unhandled error"/>
     * </on-error-propagate>
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        log.error("❌ [MuleSoft Error Handler - UNKNOWN] Unhandled error: {}", ex.getMessage(), ex);
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.put("error", "Unexpected Error");
        errorResponse.put("message", "An unexpected error occurred");
        errorResponse.put("mulesoft_equivalent", "Catch-all error handler");
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
