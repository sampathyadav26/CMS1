package com.maveric.cms.dto.response;

import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAllCustomers<CustomerResponse> {
    private List<CustomerResponse> content;
    private int currentPage;
    private long totalItems;
    private int totalPages;
}