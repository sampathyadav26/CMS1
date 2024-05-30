package com.maveric.cms_agent_note.controller;

import com.maveric.cms_agent_note.dto.request.AgentNoteRequest;
import com.maveric.cms_agent_note.dto.response.NoteResponse;
import com.maveric.cms_agent_note.service.AgentNoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/agentnote")
@RestController
 public class AgentNoteController {
     @Autowired
     private AgentNoteService agentNoteService;

    @Operation(summary = "Save Agent Notes in the Database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes added successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})

     @PostMapping("/register")
     public ResponseEntity<String> register(@Valid @RequestBody AgentNoteRequest agentNote) {
         agentNoteService.saveAgentNote(agentNote);
         return ResponseEntity.status(HttpStatus.OK).body("Note Added Successfully");
     }

    @Operation(summary = "Get Agent Notes for a Specific ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes retrieved successfully",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = NoteResponse.class)))),
            @ApiResponse(responseCode = "400", description = "Bad Request, Check the Request",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal Server Error",
                    content = @Content(mediaType = "application/json"))})
     @GetMapping("/notes/{caseId}")
     public ResponseEntity<List<NoteResponse>> listNotes(@PathVariable("caseId") long caseId){
         List<NoteResponse> notes = agentNoteService.findNoteByCaseId(caseId);
         return  ResponseEntity.status(HttpStatus.OK).body(notes);
     }
 }
