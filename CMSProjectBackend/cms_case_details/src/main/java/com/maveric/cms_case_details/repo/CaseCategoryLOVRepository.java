package com.maveric.cms_case_details.repo;

import com.maveric.cms_case_details.entity.CaseCategoryLOV;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CaseCategoryLOVRepository extends JpaRepository<CaseCategoryLOV, Long> {
    Optional<CaseCategoryLOV> findByCaseType(String caseType);
}
