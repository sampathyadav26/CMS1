package com.maveric.cms.repo;

import com.maveric.cms.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

import java.util.Optional;


@Repository
public interface AgentRepository extends JpaRepository<Agent,Long> {

    Agent findByEmailAndDob(String email, LocalDate dob);
    Optional<Agent> findByEmail(String email);
    Agent findByEmailAndPassword(String email, String password);
}
