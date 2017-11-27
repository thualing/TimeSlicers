package com.timeslicers.service;

import com.timeslicers.domain.Timelines;
import com.timeslicers.repository.TimelinesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Timelines.
 */
@Service
@Transactional
public class TimelinesService {

    private final Logger log = LoggerFactory.getLogger(TimelinesService.class);

    private final TimelinesRepository timelinesRepository;

    public TimelinesService(TimelinesRepository timelinesRepository) {
        this.timelinesRepository = timelinesRepository;
    }

    /**
     * Save a timelines.
     *
     * @param timelines the entity to save
     * @return the persisted entity
     */
    public Timelines save(Timelines timelines) {
        log.debug("Request to save Timelines : {}", timelines);
        return timelinesRepository.save(timelines);
    }

    /**
     *  Get all the timelines.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Timelines> findAll() {
        log.debug("Request to get all Timelines");
        return timelinesRepository.findAll();
    }

    /**
     *  Get one timelines by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Timelines findOne(Long id) {
        log.debug("Request to get Timelines : {}", id);
        return timelinesRepository.findOne(id);
    }

    /**
     *  Delete the  timelines by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Timelines : {}", id);
        timelinesRepository.delete(id);
    }
}
