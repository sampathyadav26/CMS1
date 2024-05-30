package com.maveric.cms_audit_event.controller;

import com.maveric.cms_audit_event.dto.request.AuditEventRequest;
import com.maveric.cms_audit_event.dto.response.AuditResponse;
import com.maveric.cms_audit_event.service.AuditEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/auditevent")
@RestController
public class AuditEventController {
    @Autowired
    private AuditEventService auditEventService;

    @Operation(summary = "When case is registered, the Audit Event Api is also triggered")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "The Audit Event is Started as the Case is Started",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Void.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content)})

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuditEventRequest audit) {
        auditEventService.register(audit);
        return ResponseEntity.ok().build();
    }


    @Operation(summary = "The Audit Events of a Specific Case  Id is Fetched")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "The Events are Fetched Successfully",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = AuditResponse.class)))),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content)})
    @GetMapping("/get/id/{caseId}")
    public ResponseEntity<List<AuditResponse>> lisAuditEvents(@PathVariable("caseId") long caseId){
        List<AuditResponse> notes = auditEventService.findNoteByCaseId(caseId);
        return  ResponseEntity.status(HttpStatus.OK).body(notes);
    }
}
