package com.maveric.cms_agent_note.repo;

import com.maveric.cms_agent_note.entity.AgentNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AgentNoteRepository extends JpaRepository<AgentNote, Long> {

    List<AgentNote> findByCaseId(long caseId);
}
