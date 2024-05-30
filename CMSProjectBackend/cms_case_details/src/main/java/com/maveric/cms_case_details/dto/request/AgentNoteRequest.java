package com.maveric.cms_case_details.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AgentNoteRequest {
    private Long caseId;
    private String createdBy;
    private String firstName;
    private String lastName;
    private String note;
}