package com.maveric.cms.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterationRequest {
    private String email;
    private String password;
    private String confirmpassword;
    private String firstName;
    private String lastName;
    private LocalDate dob;

}

