package com.timeslicers.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timeslicers.domain.Timelines;
import com.timeslicers.service.TimelinesService;
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
 * REST controller for managing Timelines.
 */
@RestController
@RequestMapping("/api")
public class TimelinesResource {

    private final Logger log = LoggerFactory.getLogger(TimelinesResource.class);

    private static final String ENTITY_NAME = "timelines";

    private final TimelinesService timelinesService;

    public TimelinesResource(TimelinesService timelinesService) {
        this.timelinesService = timelinesService;
    }

    /**
     * POST  /timelines : Create a new timelines.
     *
     * @param timelines the timelines to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timelines, or with status 400 (Bad Request) if the timelines has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/timelines")
    @Timed
    public ResponseEntity<Timelines> createTimelines(@RequestBody Timelines timelines) throws URISyntaxException {
        log.debug("REST request to save Timelines : {}", timelines);
        if (timelines.getId() != null) {
            throw new BadRequestAlertException("A new timelines cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Timelines result = timelinesService.save(timelines);
        return ResponseEntity.created(new URI("/api/timelines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /timelines : Updates an existing timelines.
     *
     * @param timelines the timelines to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timelines,
     * or with status 400 (Bad Request) if the timelines is not valid,
     * or with status 500 (Internal Server Error) if the timelines couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/timelines")
    @Timed
    public ResponseEntity<Timelines> updateTimelines(@RequestBody Timelines timelines) throws URISyntaxException {
        log.debug("REST request to update Timelines : {}", timelines);
        if (timelines.getId() == null) {
            return createTimelines(timelines);
        }
        Timelines result = timelinesService.save(timelines);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timelines.getId().toString()))
            .body(result);
    }

    /**
     * GET  /timelines : get all the timelines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of timelines in body
     */
    @GetMapping("/timelines")
    @Timed
    public List<Timelines> getAllTimelines() {
        log.debug("REST request to get all Timelines");
        return timelinesService.findAll();
        }

    /**
     * GET  /timelines/:id : get the "id" timelines.
     *
     * @param id the id of the timelines to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timelines, or with status 404 (Not Found)
     */
    @GetMapping("/timelines/{id}")
    @Timed
    public ResponseEntity<Timelines> getTimelines(@PathVariable Long id) {
        log.debug("REST request to get Timelines : {}", id);
        Timelines timelines = timelinesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(timelines));
    }

    /**
     * DELETE  /timelines/:id : delete the "id" timelines.
     *
     * @param id the id of the timelines to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/timelines/{id}")
    @Timed
    public ResponseEntity<Void> deleteTimelines(@PathVariable Long id) {
        log.debug("REST request to delete Timelines : {}", id);
        timelinesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
