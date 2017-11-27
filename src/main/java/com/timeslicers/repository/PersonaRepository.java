package com.timeslicers.repository;

import com.timeslicers.domain.Persona;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
    @Query("select distinct persona from Persona persona left join fetch persona.attends")
    List<Persona> findAllWithEagerRelationships();

    @Query("select persona from Persona persona left join fetch persona.attends where persona.id =:id")
    Persona findOneWithEagerRelationships(@Param("id") Long id);

}
