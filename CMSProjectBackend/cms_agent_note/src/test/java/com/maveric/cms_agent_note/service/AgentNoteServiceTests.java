package com.maveric.cms_agent_note.service;

import com.maveric.cms_agent_note.clients.AuditEventClient;
import com.maveric.cms_agent_note.clients.CaseServiceClient;
import com.maveric.cms_agent_note.dto.request.AgentNoteRequest;
import com.maveric.cms_agent_note.dto.request.AuditEventRequest;
import com.maveric.cms_agent_note.dto.response.CaseDetails;
import com.maveric.cms_agent_note.dto.response.NoteResponse;
import com.maveric.cms_agent_note.entity.AgentNote;
import com.maveric.cms_agent_note.exception.CaseNotFound;
import com.maveric.cms_agent_note.exception.NotesNotFoundexception;
import com.maveric.cms_agent_note.repo.AgentNoteRepository;
import com.maveric.cms_agent_note.utility.AgentNoteUtility;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class AgentNoteServiceTests {
    @InjectMocks
    private AgentNoteService agentService;
    @Mock
    private CaseServiceClient caseServiceClient;
    @Mock
    private AgentNoteRepository agentNoteRepository;
    @Mock
    private AuditEventClient auditEventClient;
    @Mock
    private AgentNoteUtility utilities;

    @Nested
    class SaveAgentNoteTests {

        @Test
        void testSaveAgentNoteSuccessfully() {
            AgentNoteRequest request = mock(AgentNoteRequest.class);
            CaseDetails caseDetails = new CaseDetails();
            when(caseServiceClient.getCasesByCaseId(anyLong())).thenReturn(caseDetails);
            when(utilities.from(request)).thenReturn(new AgentNote());
            assertDoesNotThrow(() -> agentService.saveAgentNote(request));
            verify(agentNoteRepository, times(1)).save(any(AgentNote.class));
            verify(auditEventClient, times(1)).register(any(AuditEventRequest.class));
        }


        @Test
        void testSaveAgentNoteCaseNotFound() {
            AgentNoteRequest request = mock(AgentNoteRequest.class);
            when(request.getCaseId()).thenReturn(123L);
            when(caseServiceClient.getCasesByCaseId(anyLong())).thenReturn(null);
            Exception exception = assertThrows(CaseNotFound.class, () -> agentService.saveAgentNote(request));
            assertTrue(exception.getMessage().contains("case not found-"));
        }



        @Test
        void testSaveAgentNoteAuditEventFailure() {
            AgentNoteRequest request = mock(AgentNoteRequest.class);
            CaseDetails caseDetails = new CaseDetails();
            when(request.getCaseId()).thenReturn(123L);
            when(caseServiceClient.getCasesByCaseId(anyLong())).thenReturn(caseDetails);
            when(utilities.from(request)).thenReturn(new AgentNote());
            doThrow(new RuntimeException("Some error occurred. Please try again...")).when(auditEventClient).register(any(AuditEventRequest.class));
            Exception exception = assertThrows(RuntimeException.class, () -> agentService.saveAgentNote(request));
            assertEquals("Some error occurred. Please try again...", exception.getMessage());
        }


    }

    @Nested
    class FindNoteByCaseIdTests {

        @Test
        void testFindNoteByCaseIdSuccessfully() {
            long caseId = 1L;
            List<AgentNote> notes = Collections.singletonList(new AgentNote());
            when(agentNoteRepository.findByCaseId(caseId)).thenReturn(notes);
            when(utilities.from(any(AgentNote.class))).thenReturn(new NoteResponse());

            List<NoteResponse> responses = agentService.findNoteByCaseId(caseId);

            assertFalse(responses.isEmpty());
            verify(agentNoteRepository, times(1)).findByCaseId(caseId);
        }

        @Test
        void testFindNoteByCaseIdNotesNotFound() {
            long caseId = 1L;
            when(agentNoteRepository.findByCaseId(caseId)).thenReturn(Collections.emptyList());

            Exception exception = assertThrows(NotesNotFoundexception.class, () -> agentService.findNoteByCaseId(caseId));
            assertTrue(exception.getMessage().contains("notes not found"));
        }
    }
}
