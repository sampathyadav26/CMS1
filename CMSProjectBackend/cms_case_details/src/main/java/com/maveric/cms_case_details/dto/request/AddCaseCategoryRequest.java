package com.maveric.cms_case_details.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AddCaseCategoryRequest {
    private String caseType;
    private Map<String, String[]> caseCategories;
}
