package com.maveric.cms_audit_event.dto.request;

import lombok.Data;

@Data
public class AuditEventRequest {
    private Long caseId;
    private String firstName;
    private String lastName;
    private String description;
    private String createdBy;
}
