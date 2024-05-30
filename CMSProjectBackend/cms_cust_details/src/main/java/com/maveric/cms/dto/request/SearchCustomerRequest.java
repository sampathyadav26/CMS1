package com.maveric.cms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchCustomerRequest {
    private Long customerId;
    private int currentPage;
    private int recordsPerPage;
}
