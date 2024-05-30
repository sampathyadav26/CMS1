package com.maveric.cms_case_details.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

// CaseEntity.java
@Entity
@Data
@Table(name = "Case_details")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CaseDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "case_id_seq")
    @SequenceGenerator(name = "case_id_seq", sequenceName = "case_id_seq", initialValue = 100000)
    private Long caseId;

    @NotNull
    private Long customerId;
    private String caseType;
    private String category;
    private String subCategory;
    private String status;
    private LocalDate createdDate;
    private String caseOwner;
    private String description;
}
