package com.maveric.cms_audit_event.controller;

import com.maveric.cms_audit_event.dto.request.AuditEventRequest;
import com.maveric.cms_audit_event.dto.response.AuditResponse;
import com.maveric.cms_audit_event.service.AuditEventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class AuditEventControllerTest {

    @Mock
    private AuditEventService auditEventService;

    @InjectMocks
    private AuditEventController auditEventController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister() {
        // Arrange
        AuditEventRequest auditEventRequest = new AuditEventRequest(/* Add necessary parameters */);
        doNothing().when(auditEventService).register(auditEventRequest);

        // Act
        ResponseEntity<Void> responseEntity = auditEventController.register(auditEventRequest);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        verify(auditEventService, times(1)).register(auditEventRequest);
    }




    @Test
    void testListAuditEvents() {
        long caseId = 123L;
        List<AuditResponse> auditResponses = Arrays.asList(new AuditResponse(), new AuditResponse());

        when(auditEventService.findNoteByCaseId(caseId)).thenReturn(auditResponses);

        ResponseEntity<List<AuditResponse>> actualResponse = auditEventController.lisAuditEvents(caseId);

        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(auditResponses, actualResponse.getBody());
        verify(auditEventService, times(1)).findNoteByCaseId(caseId);
    }

    @Test
    void testListAuditEventsWithNoEvents() {
        long caseId = 456L;

        when(auditEventService.findNoteByCaseId(caseId)).thenReturn(null);

        ResponseEntity<List<AuditResponse>> actualResponse = auditEventController.lisAuditEvents(caseId);

        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(null, actualResponse.getBody());
        verify(auditEventService, times(1)).findNoteByCaseId(caseId);
    }
}
