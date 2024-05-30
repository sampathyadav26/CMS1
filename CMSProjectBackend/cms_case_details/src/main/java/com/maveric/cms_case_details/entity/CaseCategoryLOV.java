package com.maveric.cms_case_details.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "case_category_lov") // Change table name to avoid conflict
public class CaseCategoryLOV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "case_type_id") // Define the column name for the primary key
    private Long caseTypeId;

    @Column(name = "case_type")
    private String caseType;

    @ElementCollection
    @CollectionTable(
            name = "case_category_mapping", // Change the name of the join table
            joinColumns = @JoinColumn(name = "case_type_id") // Define the foreign key column
    )
    @MapKeyColumn(name = "category")
    @Column(name = "sub_categories")
    private Map<String, String[]> caseCategories;

}