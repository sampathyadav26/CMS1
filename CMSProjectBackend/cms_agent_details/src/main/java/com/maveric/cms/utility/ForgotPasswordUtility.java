package com.maveric.cms.utility;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;


@Component
public class ForgotPasswordUtility {
    private static final DateTimeFormatter DateFormatter=DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public LocalDate toLocalDate(String text){
        LocalDate date=LocalDate.parse(text,DateFormatter);
        return date;
    }
}

