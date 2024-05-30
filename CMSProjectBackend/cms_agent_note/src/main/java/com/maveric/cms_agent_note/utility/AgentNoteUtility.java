package com.maveric.cms_agent_note.utility;

import com.maveric.cms_agent_note.dto.request.AgentNoteRequest;
import com.maveric.cms_agent_note.dto.response.NoteResponse;
import com.maveric.cms_agent_note.entity.AgentNote;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class AgentNoteUtility {
    public AgentNote from(AgentNoteRequest request) {
        return  AgentNote.builder()
                .caseId(request.getCaseId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .noteDescription(request.getNote())
                .noteCreatedBy(request.getCreatedBy())
                .build();
    }

    public NoteResponse from(AgentNote request) {
        NoteResponse noteResponse=new NoteResponse();
        BeanUtils.copyProperties(request,noteResponse);
        return noteResponse;
    }
}
