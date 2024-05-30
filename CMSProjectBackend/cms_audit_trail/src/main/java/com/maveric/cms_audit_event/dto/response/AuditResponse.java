package com.maveric.cms_audit_event.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Locale;

@Data
public class AuditResponse {
    private String firstName;
    private String lastName;
    private String description;
    private LocalDate date;
    @JsonFormat(pattern = "hh:mm a")
    private LocalTime time;
}
