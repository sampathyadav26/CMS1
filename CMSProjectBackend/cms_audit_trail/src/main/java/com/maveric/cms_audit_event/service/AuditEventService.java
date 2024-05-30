package com.maveric.cms_audit_event.service;

import com.maveric.cms_audit_event.dto.request.AuditEventRequest;
import com.maveric.cms_audit_event.dto.response.AuditResponse;
import com.maveric.cms_audit_event.entity.AuditEvent;
import com.maveric.cms_audit_event.exception.AuditEventsNotFoundexception;
import com.maveric.cms_audit_event.repo.AuditEventRepository;
import com.maveric.cms_audit_event.utility.AuditUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditEventService{

    @Autowired
    private AuditEventRepository auditEventRepository;
    @Autowired
    private AuditUtil auditUtil;

    public void register(AuditEventRequest audit){
        AuditEvent auditEvent = auditUtil.from(audit);
        AuditEvent auditEventSaved = auditEventRepository.save(auditEvent);
    }

    public List<AuditResponse> findNoteByCaseId(long caseId) {
        List<AuditEvent> audits = auditEventRepository.findByCaseId(caseId);
        if (audits.isEmpty()) {
            throw new AuditEventsNotFoundexception("Audit events not found");
        }
        return audits.stream()
                .map(auditUtil::from).collect(Collectors.toList());
    }
}