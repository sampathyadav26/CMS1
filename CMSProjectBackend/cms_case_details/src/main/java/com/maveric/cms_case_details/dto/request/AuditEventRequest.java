package com.maveric.cms_case_details.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuditEventRequest {
    private Long caseId;
    private String firstName;
    private String lastName;
    private String description;
    private String createdBy;
}

