package com.maveric.cms_audit_event.utility;

import com.maveric.cms_audit_event.dto.request.AuditEventRequest;
import com.maveric.cms_audit_event.dto.response.AuditResponse;
import com.maveric.cms_audit_event.entity.AuditEvent;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;

@Component
public class AuditUtil {
    public AuditEvent from(AuditEventRequest audit) {
        AuditEvent auditEvent = new AuditEvent();
        auditEvent.setDate(LocalDate.now(ZoneId.of("Asia/Kolkata")));
        auditEvent.setTime(LocalTime.now(ZoneId.of("Asia/Kolkata")));
        BeanUtils.copyProperties(audit, auditEvent);
        return auditEvent;
    }

    public AuditResponse from(AuditEvent request) {
        AuditResponse auditResponse = new AuditResponse();
        BeanUtils.copyProperties(request,auditResponse);
        return auditResponse;
    }
}
