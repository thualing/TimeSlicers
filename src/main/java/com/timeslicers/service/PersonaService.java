package com.timeslicers.service;

import com.timeslicers.domain.Persona;
import com.timeslicers.repository.PersonaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Persona.
 */
@Service
@Transactional
public class PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaService.class);

    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Save a persona.
     *
     * @param persona the entity to save
     * @return the persisted entity
     */
    public Persona save(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        return personaRepository.save(persona);
    }

    /**
     *  Get all the personas.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Persona> findAll() {
        log.debug("Request to get all Personas");
        return personaRepository.findAllWithEagerRelationships();
    }

    /**
     *  Get one persona by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Persona findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findOneWithEagerRelationships(id);
    }

    /**
     *  Delete the  persona by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Persona : {}", id);
        personaRepository.delete(id);
    }
}
