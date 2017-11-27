package com.timeslicers.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timeslicers.domain.Persona;
import com.timeslicers.service.PersonaService;
import com.timeslicers.web.rest.errors.BadRequestAlertException;
import com.timeslicers.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Persona.
 */
@RestController
@RequestMapping("/api")
public class PersonaResource {

    private final Logger log = LoggerFactory.getLogger(PersonaResource.class);

    private static final String ENTITY_NAME = "persona";

    private final PersonaService personaService;

    public PersonaResource(PersonaService personaService) {
        this.personaService = personaService;
    }

    /**
     * POST  /personas : Create a new persona.
     *
     * @param persona the persona to create
     * @return the ResponseEntity with status 201 (Created) and with body the new persona, or with status 400 (Bad Request) if the persona has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/personas")
    @Timed
    public ResponseEntity<Persona> createPersona(@RequestBody Persona persona) throws URISyntaxException {
        log.debug("REST request to save Persona : {}", persona);
        if (persona.getId() != null) {
            throw new BadRequestAlertException("A new persona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Persona result = personaService.save(persona);
        return ResponseEntity.created(new URI("/api/personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /personas : Updates an existing persona.
     *
     * @param persona the persona to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated persona,
     * or with status 400 (Bad Request) if the persona is not valid,
     * or with status 500 (Internal Server Error) if the persona couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/personas")
    @Timed
    public ResponseEntity<Persona> updatePersona(@RequestBody Persona persona) throws URISyntaxException {
        log.debug("REST request to update Persona : {}", persona);
        if (persona.getId() == null) {
            return createPersona(persona);
        }
        Persona result = personaService.save(persona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, persona.getId().toString()))
            .body(result);
    }

    /**
     * GET  /personas : get all the personas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of personas in body
     */
    @GetMapping("/personas")
    @Timed
    public List<Persona> getAllPersonas() {
        log.debug("REST request to get all Personas");
        return personaService.findAll();
        }

    /**
     * GET  /personas/:id : get the "id" persona.
     *
     * @param id the id of the persona to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the persona, or with status 404 (Not Found)
     */
    @GetMapping("/personas/{id}")
    @Timed
    public ResponseEntity<Persona> getPersona(@PathVariable Long id) {
        log.debug("REST request to get Persona : {}", id);
        Persona persona = personaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(persona));
    }

    /**
     * DELETE  /personas/:id : delete the "id" persona.
     *
     * @param id the id of the persona to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/personas/{id}")
    @Timed
    public ResponseEntity<Void> deletePersona(@PathVariable Long id) {
        log.debug("REST request to delete Persona : {}", id);
        personaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
