package com.timeslicers.service;

import com.timeslicers.domain.Events;
import com.timeslicers.repository.EventsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Events.
 */
@Service
@Transactional
public class EventsService {

    private final Logger log = LoggerFactory.getLogger(EventsService.class);

    private final EventsRepository eventsRepository;

    public EventsService(EventsRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }

    /**
     * Save a events.
     *
     * @param events the entity to save
     * @return the persisted entity
     */
    public Events save(Events events) {
        log.debug("Request to save Events : {}", events);
        return eventsRepository.save(events);
    }

    /**
     *  Get all the events.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Events> findAll() {
        log.debug("Request to get all Events");
        return eventsRepository.findAll();
    }

    /**
     *  Get one events by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Events findOne(Long id) {
        log.debug("Request to get Events : {}", id);
        return eventsRepository.findOne(id);
    }

    /**
     *  Delete the  events by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Events : {}", id);
        eventsRepository.delete(id);
    }
}
