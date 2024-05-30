package com.maveric.cms_audit_event.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Audit_Events")
public class AuditEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "audit_id")
    private Long auditId;

    @Column(name = "case_id")
    @NotNull
    private Long caseId;

    @Column(name ="firstname")
    @NotNull(message = "firstname cannot be null")
    private String firstName;

    @Column(name ="lastname")
    @NotNull(message = "lastname can not be null")
    private String lastName;

    @NotNull
    @Email
    private String createdBy;

    @NotNull(message = "can not be null")
    @Column(length = 1000)
    private String description;

    @Column(name = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "time")
    private LocalTime time;

}
