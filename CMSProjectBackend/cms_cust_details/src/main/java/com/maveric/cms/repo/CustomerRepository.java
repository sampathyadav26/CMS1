package com.maveric.cms.repo;

import com.maveric.cms.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByEmailId(String emailId);

    @Query("SELECT c FROM Customer c WHERE CAST(c.customerId AS string) LIKE :customerId%")
    List<Customer> findByCustomerIdStartingWith(String customerId);

}
