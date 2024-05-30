package com.maveric.cms.service;

import com.maveric.cms.dto.request.LoginRequest;
import com.maveric.cms.dto.request.RegisterationRequest;
import com.maveric.cms.dto.request.ResetPasswordRequestDTO;
import com.maveric.cms.dto.request.ValidateUserRequestDTO;
import com.maveric.cms.dto.response.LoginResponse;
import com.maveric.cms.entity.Agent;
import com.maveric.cms.exception.*;
import com.maveric.cms.repo.AgentRepository;
import com.maveric.cms.utility.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.maveric.cms.utility.ForgotPasswordUtility;

import java.time.LocalDate;
import java.util.Optional;


@Service
public class AgentRegistrationService {

     @Autowired
    private AgentRepository agentRepository;
     @Autowired
     private CommonUtils utils;

     @Autowired
     private ForgotPasswordUtility forgotPasswordUtility;

   public LoginResponse registration(RegisterationRequest request){

     Optional<Agent>  isAgent=agentRepository.findByEmail(request.getEmail());
     if(isAgent.isPresent()){
         throw new AgentIsPresentException("User Already Exist please Login");
     }

     if(request.getEmail().isEmpty()||request.getFirstName().isEmpty()||request.getLastName().isEmpty()||request.getPassword().isEmpty()||request.getConfirmpassword().isEmpty()){
         throw  new RuntimeException("Fields Should Not Be Null");
     }

     if(!utils.isValidPassword(request.getPassword())){
   throw  new InvalidPwdException("Password is weak. It should contain at least 8 characters which consists one uppercase,");
     }



     if(!request.getPassword().equals(request.getConfirmpassword())){
    throw new PasswordNotMatching("Password and Confirm Password must be same.");
    }

       LocalDate dob = request.getDob();
       LocalDate minAgeDate = LocalDate.now().minusYears(100);
       LocalDate minAdultAgeDate = LocalDate.now().minusYears(18);

       if (dob.isAfter(minAdultAgeDate)) {
           throw new InvalidDateException("Age must be Greater than 18 years.");
       } else if (dob.isBefore(minAgeDate)) {
           throw new InvalidDateException("Age  Should not be Greater than 100 years");
       }
   Agent agent=utils.from(request);

   agentRepository.save(agent);
   return utils.from(agent);
   }

    public LoginResponse login(LoginRequest request){
        Optional<Agent> isAgent=agentRepository.findByEmail(request.getEmail());
        if(isAgent.isEmpty()){
            throw  new AgentNotFoundException(request.getEmail()+"user does not exist");
        }

        if(!isAgent.get().getPassword().equals(request.getPassword())){
            throw new PasswordIncorectException("Password is Wrong");
        }
        return utils.from(isAgent.get());
    }

    public LoginResponse validatingUser(ValidateUserRequestDTO resetPassword) {
        LocalDate dob= forgotPasswordUtility.toLocalDate(resetPassword.getDob());
        Agent agent = agentRepository.findByEmailAndDob(resetPassword.getEmail().toLowerCase().trim(), dob);

        if (agent == null) {
            throw new UserNotFoundException("Sorry your details are not present in the database! please register");
        }
        return utils.from(agent);

    }

    public LoginResponse validatePassword(ResetPasswordRequestDTO resetPasswordRequestDTO) {

        if (!utils.isValidPassword(resetPasswordRequestDTO.getPassword())) {
            throw new InvalidPwdException("Password must contain one special character, one lower case one upper case character!");
        }

        Optional<Agent> agent = agentRepository.findByEmail(resetPasswordRequestDTO.getEmail());
        if (!agent.isPresent()) {
            throw new UserNotFoundException("Invalid User");
        }
        agent.get().setPassword(resetPasswordRequestDTO.getPassword());
        agentRepository.save(agent.get());
        Optional<Agent> agentSaved = agentRepository.findByEmail(resetPasswordRequestDTO.getEmail());

        return utils.from(agentSaved.get());
    }





}
