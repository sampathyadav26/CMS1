package com.maveric.cms.utils;


import com.maveric.cms.dto.request.CustomerRegistration;
import com.maveric.cms.dto.response.CustomerResponse;
import com.maveric.cms.entity.Customer;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class CustomerUtils {
    public Customer isFrom(CustomerRegistration requestDTO) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(requestDTO, customer);
        return customer;
    }

    public CustomerResponse isFrom(Customer customer) {
        CustomerResponse customerResponse = new CustomerResponse();
        BeanUtils.copyProperties(customer, customerResponse);
        return customerResponse;
    }
}
