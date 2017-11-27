package com.timeslicers.web.rest;

import com.timeslicers.TimeslicersApp;

import com.timeslicers.domain.Timelines;
import com.timeslicers.repository.TimelinesRepository;
import com.timeslicers.service.TimelinesService;
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
 * Test class for the TimelinesResource REST controller.
 *
 * @see TimelinesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TimeslicersApp.class)
public class TimelinesResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TimelinesRepository timelinesRepository;

    @Autowired
    private TimelinesService timelinesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTimelinesMockMvc;

    private Timelines timelines;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimelinesResource timelinesResource = new TimelinesResource(timelinesService);
        this.restTimelinesMockMvc = MockMvcBuilders.standaloneSetup(timelinesResource)
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
    public static Timelines createEntity(EntityManager em) {
        Timelines timelines = new Timelines()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return timelines;
    }

    @Before
    public void initTest() {
        timelines = createEntity(em);
    }

    @Test
    @Transactional
    public void createTimelines() throws Exception {
        int databaseSizeBeforeCreate = timelinesRepository.findAll().size();

        // Create the Timelines
        restTimelinesMockMvc.perform(post("/api/timelines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelines)))
            .andExpect(status().isCreated());

        // Validate the Timelines in the database
        List<Timelines> timelinesList = timelinesRepository.findAll();
        assertThat(timelinesList).hasSize(databaseSizeBeforeCreate + 1);
        Timelines testTimelines = timelinesList.get(timelinesList.size() - 1);
        assertThat(testTimelines.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTimelines.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTimelinesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timelinesRepository.findAll().size();

        // Create the Timelines with an existing ID
        timelines.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimelinesMockMvc.perform(post("/api/timelines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelines)))
            .andExpect(status().isBadRequest());

        // Validate the Timelines in the database
        List<Timelines> timelinesList = timelinesRepository.findAll();
        assertThat(timelinesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTimelines() throws Exception {
        // Initialize the database
        timelinesRepository.saveAndFlush(timelines);

        // Get all the timelinesList
        restTimelinesMockMvc.perform(get("/api/timelines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timelines.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getTimelines() throws Exception {
        // Initialize the database
        timelinesRepository.saveAndFlush(timelines);

        // Get the timelines
        restTimelinesMockMvc.perform(get("/api/timelines/{id}", timelines.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timelines.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTimelines() throws Exception {
        // Get the timelines
        restTimelinesMockMvc.perform(get("/api/timelines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTimelines() throws Exception {
        // Initialize the database
        timelinesService.save(timelines);

        int databaseSizeBeforeUpdate = timelinesRepository.findAll().size();

        // Update the timelines
        Timelines updatedTimelines = timelinesRepository.findOne(timelines.getId());
        updatedTimelines
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restTimelinesMockMvc.perform(put("/api/timelines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTimelines)))
            .andExpect(status().isOk());

        // Validate the Timelines in the database
        List<Timelines> timelinesList = timelinesRepository.findAll();
        assertThat(timelinesList).hasSize(databaseSizeBeforeUpdate);
        Timelines testTimelines = timelinesList.get(timelinesList.size() - 1);
        assertThat(testTimelines.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTimelines.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTimelines() throws Exception {
        int databaseSizeBeforeUpdate = timelinesRepository.findAll().size();

        // Create the Timelines

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTimelinesMockMvc.perform(put("/api/timelines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timelines)))
            .andExpect(status().isCreated());

        // Validate the Timelines in the database
        List<Timelines> timelinesList = timelinesRepository.findAll();
        assertThat(timelinesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTimelines() throws Exception {
        // Initialize the database
        timelinesService.save(timelines);

        int databaseSizeBeforeDelete = timelinesRepository.findAll().size();

        // Get the timelines
        restTimelinesMockMvc.perform(delete("/api/timelines/{id}", timelines.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Timelines> timelinesList = timelinesRepository.findAll();
        assertThat(timelinesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Timelines.class);
        Timelines timelines1 = new Timelines();
        timelines1.setId(1L);
        Timelines timelines2 = new Timelines();
        timelines2.setId(timelines1.getId());
        assertThat(timelines1).isEqualTo(timelines2);
        timelines2.setId(2L);
        assertThat(timelines1).isNotEqualTo(timelines2);
        timelines1.setId(null);
        assertThat(timelines1).isNotEqualTo(timelines2);
    }
}
