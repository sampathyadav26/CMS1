package com.maveric.cms.utility;

import com.maveric.cms.dto.LoginRequest;
import com.maveric.cms.dto.LoginResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class CommonUtilities {

    public LoginResponse from(LoginRequest agent){
        LoginResponse loginResponse=new LoginResponse();
        BeanUtils.copyProperties(agent,loginResponse);
        System.out.println("LOGIN RESPONSE login:"+loginResponse);
        return  loginResponse;
    }

}
