package com.maveric.cms_case_details.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GetCasesPaginationRequest {
    private int recordsPerPage;
    private int currentPage;
}
