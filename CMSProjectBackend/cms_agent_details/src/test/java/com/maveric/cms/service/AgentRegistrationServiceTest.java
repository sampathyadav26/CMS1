package com.maveric.cms.service;


import com.maveric.cms.dto.request.LoginRequest;
import com.maveric.cms.dto.request.RegisterationRequest;
import com.maveric.cms.dto.request.ResetPasswordRequestDTO;
import com.maveric.cms.dto.request.ValidateUserRequestDTO;
import com.maveric.cms.dto.response.LoginResponse;
import com.maveric.cms.entity.Agent;
import com.maveric.cms.exception.*;
import com.maveric.cms.repo.AgentRepository;
import com.maveric.cms.service.AgentRegistrationService;
import com.maveric.cms.utility.CommonUtils;
import static org.junit.jupiter.api.Assertions.*;

import com.maveric.cms.utility.ForgotPasswordUtility;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.*;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class AgentRegistrationServiceTest {

    @Mock
    private AgentRepository agentRepository;

    @Mock
    private CommonUtils utils;

    @Mock
    private ForgotPasswordUtility forgotPasswordUtility;


    @InjectMocks
    @Spy
    private AgentRegistrationService agentRegistrationService;

    @Test
    void testRegistration_Success2() {
        RegisterationRequest request = getRegistrationRequest();
        Agent agent=getAgent();
        LoginResponse loginResponse=new LoginResponse();
        BeanUtils.copyProperties(agent,loginResponse);
        when(agentRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        when(utils.isValidPassword(anyString())).thenReturn(true);
        when(utils.from(any(RegisterationRequest.class))).thenReturn(agent);
        when(agentRepository.save(any(Agent.class))).thenReturn(agent);
        when(utils.from(agent)).thenReturn(loginResponse);
        LoginResponse response = agentRegistrationService.registration(request);
//		assertNotNull(response);
        assertNotNull(response);
        assertEquals(request.getEmail(), response.getEmail());
        assertEquals(request.getFirstName(), response.getFirstName());
        assertEquals(request.getLastName(), response.getLastName());
        assertEquals(request.getDob(), response.getDob());

        verify(agentRepository, times(1)).findByEmail(request.getEmail());
        verify(agentRepository, times(1)).save(agent);
    }

    @Test
    void testRegistration_when_user_already_exist_throw_AgentIsPresentException() {
        when(agentRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.ofNullable(mock(Agent.class)));
        Executable executable=()->{
            agentRegistrationService.registration(getRegistrationRequest());
        };
        assertThrows(AgentIsPresentException.class,executable);
    }

    @Test
    void testRegistration_when_passing_all_user_fields_empty_then_throws_RuntimeException() {
        when(agentRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        RegisterationRequest request = new RegisterationRequest();
        Executable executable=()->{
            agentRegistrationService.registration(request);
        };
        assertThrows(RuntimeException.class,executable);
    }

    @Test
    void testRegistration_when_passing_invalidpassword_then_throw_InvalidPwdException(){
        RegisterationRequest request = getRegistrationRequest();
        when(agentRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        when(utils.isValidPassword(anyString())).thenReturn(false);
        Executable executable=()->{
            agentRegistrationService.registration(request);
        };
        assertThrows(InvalidPwdException.class,executable);
    }

    @Test
    void testRegistration_when_passing_different_dpasswords_then_throw_PasswordNotMatching(){
        RegisterationRequest request = getRegistrationRequest();
        request.setPassword("Strong@Pwd1");
        request.setConfirmpassword("Strong@Pwd2");
        when(agentRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        when(utils.isValidPassword(anyString())).thenReturn(true);
        Executable executable=()->{
            agentRegistrationService.registration(request);
        };
        assertThrows(PasswordNotMatching.class,executable);
    }

    @Test
    void testRegistration_when_passing_todaydate_then_throw_invaliddateException(){
        RegisterationRequest request=getRegistrationRequest();
        request.setDob(LocalDate.now());
        when(agentRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.empty());
        when(utils.isValidPassword(request.getPassword())).thenReturn(true);
        Executable executable=()->{
            agentRegistrationService.registration(request);
        };
        assertThrows(InvalidDateException.class,executable);

    }

    @Test
    void testLogin_Success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("StrongPwd1");
        Agent agent = new Agent();
        agent.setEmail(request.getEmail());
        agent.setPassword(request.getPassword());
        LoginResponse expectedResponse = new LoginResponse();
        expectedResponse.setEmail(agent.getEmail());
        expectedResponse.setFirstName(agent.getFirstName());
        expectedResponse.setLastName(agent.getLastName());
        expectedResponse.setDob(LocalDate.now());
        expectedResponse.setAgentId(1l);
        when(agentRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(agent));
        when(utils.from(agent)).thenReturn(expectedResponse);
        LoginResponse response = agentRegistrationService.login(request);

        assertNotNull(response);
        assertEquals(expectedResponse.getEmail(), response.getEmail());

        verify(agentRepository, times(1)).findByEmail(request.getEmail());
    }

    @Test
    void testlogin_when_passing_user_doesnotexit_then_return_AgentNotFoundException(){
        when(agentRepository.findByEmail(getlogin().getEmail())).thenReturn(Optional.empty());
        Executable executable=()->{
            agentRegistrationService.login(getlogin());
        };
        assertThrows(AgentNotFoundException.class,executable);

    }

    @Test
    void testlogin_when_passing_two_differnet_password_then_return_pwdincorrectException(){
        when(agentRepository.findByEmail(getlogin().getEmail())).thenReturn(Optional.ofNullable(getAgent()));
        LoginRequest loginRequest=getlogin();
        loginRequest.setPassword("Strong@Pwd2");
        Executable executable=()->{
            agentRegistrationService.login(loginRequest);
        };
        assertThrows(PasswordIncorectException.class,executable);

    }



    public RegisterationRequest getRegistrationRequest(){
        RegisterationRequest request = new RegisterationRequest();
        request.setEmail("test@example.com");
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setPassword("Strong@Pwd1");
        request.setConfirmpassword("Strong@Pwd1");
        request.setDob(LocalDate.of(1990, 1, 1));
        return request;
    }
    public  LoginRequest getlogin(){

        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setPassword("StrongPwd1");
        return request;
    }
    public Agent getAgent1(){
        Agent agent = new Agent();
        agent.setEmail(agent.getEmail());
        agent.setPassword(agent.getPassword());
        return agent;
    }
    public Agent getAgent(){
        RegisterationRequest request=getRegistrationRequest();
        Agent agent = new Agent();
        agent.setEmail(request.getEmail());
        agent.setFirstName(request.getFirstName());
        agent.setLastName(request.getLastName());
        agent.setPassword(request.getPassword());
        agent.setDob(request.getDob());
        agent.setTimer(LocalDateTime.now());
        agent.setAgentId(1l);
        return agent;
    }


    @Test
    void validatingUser_ValidUser_ReturnsLoginResponse() {

        ValidateUserRequestDTO validateUserRequestDTO = new ValidateUserRequestDTO("test@example.com", "1990-01-01");
        LocalDate dob = LocalDate.parse("1990-01-01");
        when(forgotPasswordUtility.toLocalDate("1990-01-01")).thenReturn(dob);
        Agent mockAgent = new Agent();
        mockAgent.setEmail("test@example.com");
        mockAgent.setDob(dob);
        when(agentRepository.findByEmailAndDob("test@example.com", dob)).thenReturn(mockAgent);
        when(utils.from(mockAgent)).thenReturn(new LoginResponse());


        LoginResponse response = agentRegistrationService.validatingUser(validateUserRequestDTO);


        assertNotNull(response);
    }

    @Test
    void validatingUser_InvalidUser_ThrowsUserNotFoundException() {

        ValidateUserRequestDTO validateUserRequestDTO = new ValidateUserRequestDTO("nonexistent@example.com", "1990-01-01");
        LocalDate dob = LocalDate.parse("1990-01-01");
        when(forgotPasswordUtility.toLocalDate("1990-01-01")).thenReturn(dob);
        when(agentRepository.findByEmailAndDob("nonexistent@example.com", dob)).thenReturn(null);


        assertThrows(UserNotFoundException.class, () -> agentRegistrationService.validatingUser(validateUserRequestDTO));
    }

    @Test
    void validatePassword_ValidPassword_ReturnsLoginResponse() {

        ResetPasswordRequestDTO resetPasswordRequestDTO = new ResetPasswordRequestDTO("test@example.com", "NewPassword123");
        when(utils.isValidPassword("NewPassword123")).thenReturn(true);
        Optional<Agent> mockAgentOptional = Optional.of(new Agent());
        when(agentRepository.findByEmail("test@example.com")).thenReturn(mockAgentOptional);
        Agent mockAgent = mockAgentOptional.get();
        when(utils.from(mockAgent)).thenReturn(new LoginResponse());


        LoginResponse response = agentRegistrationService.validatePassword(resetPasswordRequestDTO);


        assertNotNull(response);
    }

    @Test
    void validatePassword_InvalidPassword_ThrowsInvalidPwdException() {

        ResetPasswordRequestDTO resetPasswordRequestDTO = new ResetPasswordRequestDTO("test@example.com", "weakpassword");
        when(utils.isValidPassword("weakpassword")).thenReturn(false);


        assertThrows(InvalidPwdException.class, () -> agentRegistrationService.validatePassword(resetPasswordRequestDTO));
    }

    @Test
    void validatePassword_UserNotFound_ThrowsUserNotFoundException() {

        ResetPasswordRequestDTO resetPasswordRequestDTO = new ResetPasswordRequestDTO("nonexistent@example.com", "NewPassword123");
        when(utils.isValidPassword("NewPassword123")).thenReturn(true);
        when(agentRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());


        assertThrows(UserNotFoundException.class, () -> agentRegistrationService.validatePassword(resetPasswordRequestDTO));
    }

    @Test
    void validatePassword_SavePasswordSuccessfully_ReturnsLoginResponse() {

        ResetPasswordRequestDTO resetPasswordRequestDTO = new ResetPasswordRequestDTO("test@example.com", "NewPassword123");
        when(utils.isValidPassword("NewPassword123")).thenReturn(true);
        Optional<Agent> mockAgentOptional = Optional.of(new Agent());
        when(agentRepository.findByEmail("test@example.com")).thenReturn(mockAgentOptional);
        Agent mockAgent = mockAgentOptional.get();
        when(agentRepository.save(mockAgent)).thenReturn(mockAgent);
        when(utils.from(mockAgent)).thenReturn(new LoginResponse());


        LoginResponse response = agentRegistrationService.validatePassword(resetPasswordRequestDTO);


        assertNotNull(response);
    }

    @Test
    void validatePassword_InvalidPasswordFormat_ThrowsInvalidPwdException() {

        ResetPasswordRequestDTO resetPasswordRequestDTO = new ResetPasswordRequestDTO("test@example.com", "invalidpassword");
        when(utils.isValidPassword("invalidpassword")).thenReturn(false);


        assertThrows(InvalidPwdException.class, () -> agentRegistrationService.validatePassword(resetPasswordRequestDTO));
    }


}
