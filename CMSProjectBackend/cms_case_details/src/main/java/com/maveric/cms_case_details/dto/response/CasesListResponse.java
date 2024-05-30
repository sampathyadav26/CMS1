package com.maveric.cms_case_details.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CasesListResponse {
    private Long caseId;
    private String caseType;
    private String category;
    private String subCategory;
    private String status;
    private LocalDate createdDate;
    private String caseOwner;
}
