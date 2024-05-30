package com.maveric.cms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "customer_id_seq")
    @SequenceGenerator(name = "customer_id_seq", sequenceName = "customer_id_seq", initialValue = 10000000)
    @Column(name = "customer_id")
    private Long customerId;


    @Column(name = "email", nullable = false, length = 50, unique = true)
    @NotNull(message = "email can not be null")
    @Email
    private String emailId;

    @NotNull(message = "firstname cannot be null")
    private String firstname;

    @NotNull(message = "lastname can not be null")
    private String lastname;

    @Column(name = "phone_number", nullable = false, length = 10)
    @NotNull(message = "Phone number cannot be null")
    @Pattern(regexp = "[0-9]+", message = "Phone number must be numeric")
    private String mobile;

    @NotNull(message = "designation can not be null")
    private String designation;

    @NotNull(message = "nationality can not be null")
    private String nationality;


}
