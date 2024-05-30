package com.maveric.cms_audit_event.service;

import com.maveric.cms_audit_event.dto.request.AuditEventRequest;
import com.maveric.cms_audit_event.dto.response.AuditResponse;
import com.maveric.cms_audit_event.entity.AuditEvent;
import com.maveric.cms_audit_event.exception.AuditEventsNotFoundexception;
import com.maveric.cms_audit_event.repo.AuditEventRepository;
import com.maveric.cms_audit_event.utility.AuditUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuditEventServiceTest {
    @Mock
    private AuditEventRepository auditEventRepository;
    @Mock
    private AuditUtil auditUtil;
    @InjectMocks
    private AuditEventService auditService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Nested
    class RegisterTest {

        @Nested
        class PositiveScenarios {
            @Test
            void whenRegisterCalledWithValidAudit_thenSuccess() {
                AuditEventRequest auditRequest = new AuditEventRequest(); // Populate with valid data
                AuditEvent auditEvent = new AuditEvent(); // Assume this is the expected transformation
                when(auditUtil.from(auditRequest)).thenReturn(auditEvent);
                when(auditEventRepository.save(any(AuditEvent.class))).thenReturn(auditEvent);

                auditService.register(auditRequest);

                verify(auditEventRepository, times(1)).save(auditEvent);
            }

            @Test
            void whenRegisterCalled_verifyTransformationLogic() {
                AuditEventRequest auditRequest = new AuditEventRequest(); // Populate with valid data
                AuditEvent auditEvent = new AuditEvent();
                when(auditUtil.from(auditRequest)).thenReturn(auditEvent);

                auditService.register(auditRequest);

                verify(auditUtil, times(1)).from(auditRequest);
            }

        }

        @Nested
        class NegativeScenarios {

            @Test
            void whenRepositorySaveFails_thenThrowException() {
                AuditEventRequest auditRequest = new AuditEventRequest(); // Populate with valid data
                AuditEvent auditEvent = new AuditEvent();
                when(auditUtil.from(auditRequest)).thenReturn(auditEvent);
                when(auditEventRepository.save(any(AuditEvent.class))).thenThrow(new RuntimeException("Database error"));

                assertThrows(RuntimeException.class, () -> auditService.register(auditRequest));
            }

        }
    }

    @Nested
    class FindNoteByCaseIdTests {

        @Test
        void whenValidCaseIdWithSingleAuditEvent_thenReturnSingleResponse() {
            long caseId = 1L;
            List<AuditEvent> mockEvents = Collections.singletonList(new AuditEvent());
            Mockito.when(auditEventRepository.findByCaseId(caseId)).thenReturn(mockEvents);
            Mockito.when(auditUtil.from(Mockito.any(AuditEvent.class))).thenReturn(new AuditResponse());

            List<AuditResponse> responses = auditService.findNoteByCaseId(caseId);

            assertEquals(1, responses.size(), "Should return exactly one response for one audit event");
        }

        @Test
        void whenValidCaseIdWithMultipleAuditEvents_thenReturnAllResponses() {
            long caseId = 1L;
            List<AuditEvent> mockEvents = IntStream.range(0, 3)
                    .mapToObj(i -> new AuditEvent())
                    .collect(Collectors.toList());
            Mockito.when(auditEventRepository.findByCaseId(caseId)).thenReturn(mockEvents);
            Mockito.when(auditUtil.from(Mockito.any(AuditEvent.class))).thenAnswer(invocation -> new AuditResponse());

            List<AuditResponse> responses = auditService.findNoteByCaseId(caseId);

            assertEquals(3, responses.size(), "Should return a response for each audit event");
        }

        @Test
        void whenCaseIdWithNoAuditEvents_thenThrowAuditEventsNotFoundException() {
            long caseId = 999L; // Assuming this ID has no associated audit events
            Mockito.when(auditEventRepository.findByCaseId(caseId)).thenReturn(new ArrayList<>());

            assertThrows(AuditEventsNotFoundexception.class, () -> auditService.findNoteByCaseId(caseId),
                    "Should throw AuditEventsNotFoundexception when no audit events are found");
        }

        @Test
        void whenInvalidCaseId_thenThrowAuditEventsNotFoundException() {
            long caseId = -1L; // Assuming negative values are considered invalid
            // This test assumes that the method treats invalid case IDs the same way as IDs with no events
            Mockito.when(auditEventRepository.findByCaseId(caseId)).thenReturn(new ArrayList<>());

            assertThrows(AuditEventsNotFoundexception.class, () -> auditService.findNoteByCaseId(caseId),
                    "Should throw AuditEventsNotFoundexception for invalid caseId");
        }
    }

}
