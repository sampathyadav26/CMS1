package com.maveric.cms_case_details.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseCategoryLOVResponse {
    private String caseType;
    private List<String> caseCategories;
}
