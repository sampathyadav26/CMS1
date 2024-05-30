package com.maveric.cms_agent_note.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CaseDetails {
    private Long caseId;
//    private Long customerId;
    private String caseType;
    private String category;
    private String createdBy;
    private String subCategory;
//    private String agentComments;
    private String description;
}

