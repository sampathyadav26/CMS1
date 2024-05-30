package com.maveric.cms_audit_event.repo;

import com.maveric.cms_audit_event.entity.AuditEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditEventRepository extends JpaRepository<AuditEvent, Long> {
    List<AuditEvent> findByCaseId(long caseId);
}