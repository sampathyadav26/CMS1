package com.maveric.cms.controller;

import com.maveric.cms.dto.request.LoginRequest;
import com.maveric.cms.dto.request.RegisterationRequest;
import com.maveric.cms.dto.request.ResetPasswordRequestDTO;
import com.maveric.cms.dto.request.ValidateUserRequestDTO;
import com.maveric.cms.dto.response.LoginResponse;
import com.maveric.cms.service.AgentRegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/user")
@RestController
public class AgentRegistrationController {

    @Autowired
    private AgentRegistrationService agentRegistrationService;

    @Operation(summary = "Agent is Registered")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Agent Details Successfully Received", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))}), @ApiResponse(responseCode = "400", description = "Agent Details is not received", content = @Content)})

    @PostMapping("/register/agent")
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterationRequest request) {
        LoginResponse response = agentRegistrationService.registration(request);
        System.out.println("this is controller" + response);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @Operation(summary = "Login With Credentials")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Login Successful", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))}), @ApiResponse(responseCode = "400", description = "Login Failed", content = @Content)})
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginresponse = agentRegistrationService.login(loginRequest);
        return new ResponseEntity<>(loginresponse, HttpStatus.OK);
    }

    @Operation(summary = "Validating the Agent is Valid or Not")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Agent is Present in the Database", content = {@Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))}), @ApiResponse(responseCode = "400", description = "Invalid Request is Found", content = @Content)})

    @PostMapping("/validateUser")
    public ResponseEntity<LoginResponse> validatingUser(@Valid @RequestBody ValidateUserRequestDTO validateUserRequestDTO) {
        LoginResponse response = agentRegistrationService.validatingUser(validateUserRequestDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @Operation(summary = "Update the Password")

    @ApiResponses(value = {

            @ApiResponse(responseCode = "200", description = "Password is successfully set",

                    content = {@Content(mediaType = "application/json",

                            schema = @Schema(implementation = LoginResponse.class))}),

            @ApiResponse(responseCode = "400", description = "Please Check the Request",

                    content = @Content)})

    @PostMapping("/updatePassword")
    public ResponseEntity<LoginResponse> acceptingNewCreds(@RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO) {
        LoginResponse acceptNewCreds = agentRegistrationService.validatePassword(resetPasswordRequestDTO);


        return new ResponseEntity<>(acceptNewCreds, HttpStatus.OK);
    }

}
