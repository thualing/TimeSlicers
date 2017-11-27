package com.timeslicers.web.rest;

import com.timeslicers.TimeslicersApp;

import com.timeslicers.domain.TimelineGroups;
import com.timeslicers.repository.TimelineGroupsRepository;
import com.timeslicers.service.TimelineGroupsService;
import com.timeslicers.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.timeslicers.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TimelineGroupsResource REST controller.
 *
 * @see TimelineGroupsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TimeslicersApp.class)
public class TimelineGroupsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TimelineGroupsRepository timelineGroupsRepository;

    @Autowired
    private TimelineGroupsService timelineGroupsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTimelineGroupsMockMvc;

    private TimelineGroups timelineGroups;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimelineGroupsResource timelineGroupsResource = new TimelineGroupsResource(timelineGroupsService);
        this.restTimelineGroupsMockMvc = MockMvcBuilders.standaloneSetup(timelineGroupsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimelineGroups createEntity(EntityManager em) {
        TimelineGroups timelineGroups = new TimelineGroups()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return timelineGroups;
    }

    @Before
    public void initTest() {
        timelineGroups = createEntity(em);
    }

    @Test
    @Transactional
    public void createTimelineGroups() throws Exception {
        int databaseSizeBeforeCreate = timelineGroupsRepository.findAll().size();

        // Create the TimelineGroups
        restTimelineGroupsMockMvc.perform(post("/api/timeline-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineGroups)))
            .andExpect(status().isCreated());

        // Validate the TimelineGroups in the database
        List<TimelineGroups> timelineGroupsList = timelineGroupsRepository.findAll();
        assertThat(timelineGroupsList).hasSize(databaseSizeBeforeCreate + 1);
        TimelineGroups testTimelineGroups = timelineGroupsList.get(timelineGroupsList.size() - 1);
        assertThat(testTimelineGroups.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTimelineGroups.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTimelineGroupsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timelineGroupsRepository.findAll().size();

        // Create the TimelineGroups with an existing ID
        timelineGroups.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimelineGroupsMockMvc.perform(post("/api/timeline-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineGroups)))
            .andExpect(status().isBadRequest());

        // Validate the TimelineGroups in the database
        List<TimelineGroups> timelineGroupsList = timelineGroupsRepository.findAll();
        assertThat(timelineGroupsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTimelineGroups() throws Exception {
        // Initialize the database
        timelineGroupsRepository.saveAndFlush(timelineGroups);

        // Get all the timelineGroupsList
        restTimelineGroupsMockMvc.perform(get("/api/timeline-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timelineGroups.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getTimelineGroups() throws Exception {
        // Initialize the database
        timelineGroupsRepository.saveAndFlush(timelineGroups);

        // Get the timelineGroups
        restTimelineGroupsMockMvc.perform(get("/api/timeline-groups/{id}", timelineGroups.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timelineGroups.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTimelineGroups() throws Exception {
        // Get the timelineGroups
        restTimelineGroupsMockMvc.perform(get("/api/timeline-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTimelineGroups() throws Exception {
        // Initialize the database
        timelineGroupsService.save(timelineGroups);

        int databaseSizeBeforeUpdate = timelineGroupsRepository.findAll().size();

        // Update the timelineGroups
        TimelineGroups updatedTimelineGroups = timelineGroupsRepository.findOne(timelineGroups.getId());
        updatedTimelineGroups
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restTimelineGroupsMockMvc.perform(put("/api/timeline-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTimelineGroups)))
            .andExpect(status().isOk());

        // Validate the TimelineGroups in the database
        List<TimelineGroups> timelineGroupsList = timelineGroupsRepository.findAll();
        assertThat(timelineGroupsList).hasSize(databaseSizeBeforeUpdate);
        TimelineGroups testTimelineGroups = timelineGroupsList.get(timelineGroupsList.size() - 1);
        assertThat(testTimelineGroups.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTimelineGroups.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTimelineGroups() throws Exception {
        int databaseSizeBeforeUpdate = timelineGroupsRepository.findAll().size();

        // Create the TimelineGroups

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTimelineGroupsMockMvc.perform(put("/api/timeline-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelineGroups)))
            .andExpect(status().isCreated());

        // Validate the TimelineGroups in the database
        List<TimelineGroups> timelineGroupsList = timelineGroupsRepository.findAll();
        assertThat(timelineGroupsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTimelineGroups() throws Exception {
        // Initialize the database
        timelineGroupsService.save(timelineGroups);

        int databaseSizeBeforeDelete = timelineGroupsRepository.findAll().size();

        // Get the timelineGroups
        restTimelineGroupsMockMvc.perform(delete("/api/timeline-groups/{id}", timelineGroups.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TimelineGroups> timelineGroupsList = timelineGroupsRepository.findAll();
        assertThat(timelineGroupsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimelineGroups.class);
        TimelineGroups timelineGroups1 = new TimelineGroups();
        timelineGroups1.setId(1L);
        TimelineGroups timelineGroups2 = new TimelineGroups();
        timelineGroups2.setId(timelineGroups1.getId());
        assertThat(timelineGroups1).isEqualTo(timelineGroups2);
        timelineGroups2.setId(2L);
        assertThat(timelineGroups1).isNotEqualTo(timelineGroups2);
        timelineGroups1.setId(null);
        assertThat(timelineGroups1).isNotEqualTo(timelineGroups2);
    }
}
