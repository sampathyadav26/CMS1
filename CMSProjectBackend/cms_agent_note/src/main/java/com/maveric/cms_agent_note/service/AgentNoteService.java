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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgentNoteService {
    @Autowired
    private AgentNoteRepository agentNoteRepository;
    @Autowired
    private AgentNoteUtility utilities;
    @Autowired
    private CaseServiceClient caseServiceClient;
    @Autowired
    private AuditEventClient auditEventClient;

    public void saveAgentNote(AgentNoteRequest request) {
        CaseDetails caseDetails;
        try {
            caseDetails = caseServiceClient.getCasesByCaseId(request.getCaseId());
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        if (caseDetails == null) {
            throw new CaseNotFound("case not found-" + request.getCaseId());
        }
        AgentNote note = utilities.from(request);
        note.setCaseId(caseDetails.getCaseId());
        note.setCreatedTime(LocalDateTime.now(ZoneId.of("Asia/Kolkata")));
        agentNoteRepository.save(note);

        AuditEventRequest audit = AuditEventRequest.builder()
                .caseId(request.getCaseId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .description("Note added")
                .createdBy(request.getCreatedBy())
                .build();


        try {
            auditEventClient.register(audit);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<NoteResponse> findNoteByCaseId(long caseId) {
        List<AgentNote> notes = agentNoteRepository.findByCaseId(caseId);
        if (notes.isEmpty()) {
            throw new NotesNotFoundexception("notes not found");
        }
        return notes.stream()
                .map(utilities::from).collect(Collectors.toList());
    }

}

