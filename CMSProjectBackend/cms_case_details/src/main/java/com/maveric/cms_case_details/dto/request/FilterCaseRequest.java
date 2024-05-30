package com.maveric.cms_case_details.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterCaseRequest {
    private Long caseId;
    private List<String> status;
    private List<String> requestType;
    private List<String> category;
    private List<String> subCategory;
    private List<String> caseOwner;
    private List<String> createdOn;
    private int currentPage;
    private int recordsPerPage;
}
