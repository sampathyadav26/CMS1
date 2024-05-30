package com.maveric.cms_case_details.dto.response;

import com.maveric.cms_case_details.entity.CaseTypeOption;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CaseTypeLOVResponse {
    private Map<String, CaseTypeOption> caseTypeLOV;
}
