package com.timeslicers.repository;

import com.timeslicers.domain.Timelines;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Timelines entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimelinesRepository extends JpaRepository<Timelines, Long> {

}
