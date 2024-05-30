package com.maveric.cms_case_details.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CaseTypeOption {
    private List<String> caseCategories;
    private Map<String, String[]> subCategoryOptions;
}
