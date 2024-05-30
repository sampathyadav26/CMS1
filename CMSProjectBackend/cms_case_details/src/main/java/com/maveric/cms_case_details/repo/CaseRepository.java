package com.maveric.cms_case_details.repo;

import com.maveric.cms_case_details.dto.request.CaseRequest;
import com.maveric.cms_case_details.entity.CaseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CaseRepository extends JpaRepository<CaseDetails, Long> {

    List<CaseDetails> findByCaseOwner(String createdBy);
    List<CaseDetails> findByCaseType(String caseType);
    List<CaseDetails> findByCategory(String category);
    List<CaseDetails> findBySubCategory(String subCategory);
    List<CaseDetails> findAllByCreatedDateBetween(LocalDate fromDate, LocalDate toDate);
    List<CaseDetails> findAllByCreatedDate(LocalDate date);
    @Query("SELECT c FROM CaseDetails c WHERE CAST(c.caseId AS string) LIKE :caseId%")
    List<CaseDetails> findByCaseIdStartingWith(String caseId);




}
