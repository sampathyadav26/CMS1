package com.maveric.cms.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GetCustomerPagination {
    private int recordsPerPage;
    private int currentPage;
}
