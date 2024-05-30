package com.maveric.cms.utility;

import com.maveric.cms.dto.request.RegisterationRequest;
import com.maveric.cms.dto.response.LoginResponse;
import com.maveric.cms.entity.Agent;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CommonUtils {

    public Agent from(RegisterationRequest request) {
        Agent agent = new Agent();
        agent.setEmail(request.getEmail());
        agent.setFirstName(request.getFirstName());
        agent.setLastName(request.getLastName());
        agent.setPassword(request.getPassword());
        agent.setDob(request.getDob());
        return agent;
    }

    public LoginResponse from(Optional<Agent> agent){
        LoginResponse loginResponse=new LoginResponse();
        BeanUtils.copyProperties(agent,loginResponse);
        System.out.println("LOGIN RESPONSE:"+loginResponse);
        return  loginResponse;
    }
    public LoginResponse from(Agent agent){
        LoginResponse loginResponse=new LoginResponse();
        BeanUtils.copyProperties(agent,loginResponse);
        System.out.println("LOGIN RESPONSE:"+loginResponse);
        return  loginResponse;
    }

    public boolean isValidPassword(String password) {
        return password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$");
    }
}
