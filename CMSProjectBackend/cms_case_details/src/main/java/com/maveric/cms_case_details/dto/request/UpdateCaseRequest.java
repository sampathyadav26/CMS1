package com.maveric.cms_case_details.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZoneId;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCaseRequest {
    private Long caseId;
    private Long customerId;
    private String caseType;
    private String status;
    private String category;
    private String caseOwner;
    private String createdDate= String.valueOf(LocalDate.now(ZoneId.of("Asia/Kolkata")));
    private String subCategory;
    private String description;
    private String firstName;
    private String lastName;
}
