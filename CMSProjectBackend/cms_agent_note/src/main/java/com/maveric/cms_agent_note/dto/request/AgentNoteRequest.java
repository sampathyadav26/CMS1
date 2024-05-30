package com.maveric.cms_agent_note.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AgentNoteRequest {
    private Long caseId;
    private String firstName;
    private String lastName;
    private String createdBy;
    private String note;
}
