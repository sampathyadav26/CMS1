package com.maveric.cms_case_details.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreateCaseRequest {
    private Long customerId;
    private String caseType;
    private String category;
    private String status;
    private String caseOwner;
    private String subCategory;
    private String agentNote;
    private String description;
    private String firstName;
    private String lastName;
}