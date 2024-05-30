package com.maveric.cms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private Long customerId;
    private String firstname;
    private String lastname;
    private String mobile;
    private String emailId;
    private String designation;
    private String nationality;
}
