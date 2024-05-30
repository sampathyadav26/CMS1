package com.maveric.cms_case_details.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAllCases<CasesListResponse> {
    private List<CasesListResponse> content;
    private int currentPage;
    private long totalItems;
    private int totalPages;
}