package com.timeslicers.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timeslicers.domain.TimelineGroups;
import com.timeslicers.service.TimelineGroupsService;
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
 * REST controller for managing TimelineGroups.
 */
@RestController
@RequestMapping("/api")
public class TimelineGroupsResource {

    private final Logger log = LoggerFactory.getLogger(TimelineGroupsResource.class);

    private static final String ENTITY_NAME = "timelineGroups";

    private final TimelineGroupsService timelineGroupsService;

    public TimelineGroupsResource(TimelineGroupsService timelineGroupsService) {
        this.timelineGroupsService = timelineGroupsService;
    }

    /**
     * POST  /timeline-groups : Create a new timelineGroups.
     *
     * @param timelineGroups the timelineGroups to create
     * @return the ResponseEntity with status 201 (Created) and with body the new timelineGroups, or with status 400 (Bad Request) if the timelineGroups has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/timeline-groups")
    @Timed
    public ResponseEntity<TimelineGroups> createTimelineGroups(@RequestBody TimelineGroups timelineGroups) throws URISyntaxException {
        log.debug("REST request to save TimelineGroups : {}", timelineGroups);
        if (timelineGroups.getId() != null) {
            throw new BadRequestAlertException("A new timelineGroups cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimelineGroups result = timelineGroupsService.save(timelineGroups);
        return ResponseEntity.created(new URI("/api/timeline-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /timeline-groups : Updates an existing timelineGroups.
     *
     * @param timelineGroups the timelineGroups to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated timelineGroups,
     * or with status 400 (Bad Request) if the timelineGroups is not valid,
     * or with status 500 (Internal Server Error) if the timelineGroups couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/timeline-groups")
    @Timed
    public ResponseEntity<TimelineGroups> updateTimelineGroups(@RequestBody TimelineGroups timelineGroups) throws URISyntaxException {
        log.debug("REST request to update TimelineGroups : {}", timelineGroups);
        if (timelineGroups.getId() == null) {
            return createTimelineGroups(timelineGroups);
        }
        TimelineGroups result = timelineGroupsService.save(timelineGroups);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, timelineGroups.getId().toString()))
            .body(result);
    }

    /**
     * GET  /timeline-groups : get all the timelineGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of timelineGroups in body
     */
    @GetMapping("/timeline-groups")
    @Timed
    public List<TimelineGroups> getAllTimelineGroups() {
        log.debug("REST request to get all TimelineGroups");
        return timelineGroupsService.findAll();
        }

    /**
     * GET  /timeline-groups/:id : get the "id" timelineGroups.
     *
     * @param id the id of the timelineGroups to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the timelineGroups, or with status 404 (Not Found)
     */
    @GetMapping("/timeline-groups/{id}")
    @Timed
    public ResponseEntity<TimelineGroups> getTimelineGroups(@PathVariable Long id) {
        log.debug("REST request to get TimelineGroups : {}", id);
        TimelineGroups timelineGroups = timelineGroupsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(timelineGroups));
    }

    /**
     * DELETE  /timeline-groups/:id : delete the "id" timelineGroups.
     *
     * @param id the id of the timelineGroups to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/timeline-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteTimelineGroups(@PathVariable Long id) {
        log.debug("REST request to delete TimelineGroups : {}", id);
        timelineGroupsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
