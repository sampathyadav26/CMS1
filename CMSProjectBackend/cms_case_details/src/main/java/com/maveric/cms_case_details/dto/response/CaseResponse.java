package com.maveric.cms_case_details.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaseResponse {
    private Long caseId;
    private Long customerId;
    private String caseType;
    private String category;
    private String subCategory;
    private String status;
    private LocalDate createdDate;
    private String caseOwner;
    private String description;
}