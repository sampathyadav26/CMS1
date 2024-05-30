package com.maveric.cms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerRegistration {
    private String firstname;
    private String lastname;
    private String mobile;
    private String emailId;
    private String designation;
    private String nationality;
}
