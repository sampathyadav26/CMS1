package com.maveric.cms.controller;


import com.maveric.cms.dto.LoginRequest;
import com.maveric.cms.dto.LoginResponse;
import com.maveric.cms.service.LoginService;
import com.maveric.cms.utility.CommonUtilities;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userlogin")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @Operation(summary = "Login With Credentials")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login Successful",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponse.class)) }),
            @ApiResponse(responseCode = "400", description = "Login Failed",
                    content = @Content)})

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginresponse = loginService.login(loginRequest);
        return new ResponseEntity<>(loginresponse, HttpStatus.OK);
    }
}