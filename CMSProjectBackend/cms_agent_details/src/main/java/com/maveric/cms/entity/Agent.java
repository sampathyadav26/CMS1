package com.maveric.cms.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.CurrentTimestamp;


import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Agent_details")
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agent_id")
    private Long agentId;


    @Column(name = "email", nullable = false, length = 50, unique = true)
    @NotNull(message = "email can not be null")
    @Email
    private String email;

    @Column(name ="password")
    @NotNull(message = "password can not be null")
    private String password;


    @Column(name ="firstname")
    @NotNull(message = "firstname cannot be null")
    private String firstName;

    @Column(name ="lastname")
    @NotNull(message = "lastname can not be null")
    private String lastName;

    @Column(name ="DateofBirth")
    @NotNull(message = "date of birth can not be null")
    @Past
    @JsonFormat
    private LocalDate dob;

    @Column(name ="timestamp")
    @CreationTimestamp
    private LocalDateTime timer;


}



