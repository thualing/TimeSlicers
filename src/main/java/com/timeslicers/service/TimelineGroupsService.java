package com.timeslicers.service;

import com.timeslicers.domain.TimelineGroups;
import com.timeslicers.repository.TimelineGroupsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing TimelineGroups.
 */
@Service
@Transactional
public class TimelineGroupsService {

    private final Logger log = LoggerFactory.getLogger(TimelineGroupsService.class);

    private final TimelineGroupsRepository timelineGroupsRepository;

    public TimelineGroupsService(TimelineGroupsRepository timelineGroupsRepository) {
        this.timelineGroupsRepository = timelineGroupsRepository;
    }

    /**
     * Save a timelineGroups.
     *
     * @param timelineGroups the entity to save
     * @return the persisted entity
     */
    public TimelineGroups save(TimelineGroups timelineGroups) {
        log.debug("Request to save TimelineGroups : {}", timelineGroups);
        return timelineGroupsRepository.save(timelineGroups);
    }

    /**
     *  Get all the timelineGroups.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TimelineGroups> findAll() {
        log.debug("Request to get all TimelineGroups");
        return timelineGroupsRepository.findAll();
    }

    /**
     *  Get one timelineGroups by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TimelineGroups findOne(Long id) {
        log.debug("Request to get TimelineGroups : {}", id);
        return timelineGroupsRepository.findOne(id);
    }

    /**
     *  Delete the  timelineGroups by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TimelineGroups : {}", id);
        timelineGroupsRepository.delete(id);
    }
}
