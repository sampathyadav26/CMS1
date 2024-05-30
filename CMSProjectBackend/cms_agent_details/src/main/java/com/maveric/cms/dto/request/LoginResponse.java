package com.maveric.cms.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {


    private Long agentId;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate dob;

}
