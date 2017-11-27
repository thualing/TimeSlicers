package com.timeslicers.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timeslicers.domain.Item;
import com.timeslicers.service.ItemService;
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
 * REST controller for managing Item.
 */
@RestController
@RequestMapping("/api")
public class ItemResource {

    private final Logger log = LoggerFactory.getLogger(ItemResource.class);

    private static final String ENTITY_NAME = "item";

    private final ItemService itemService;

    public ItemResource(ItemService itemService) {
        this.itemService = itemService;
    }

    /**
     * POST  /items : Create a new item.
     *
     * @param item the item to create
     * @return the ResponseEntity with status 201 (Created) and with body the new item, or with status 400 (Bad Request) if the item has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/items")
    @Timed
    public ResponseEntity<Item> createItem(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to save Item : {}", item);
        if (item.getId() != null) {
            throw new BadRequestAlertException("A new item cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Item result = itemService.save(item);
        return ResponseEntity.created(new URI("/api/items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /items : Updates an existing item.
     *
     * @param item the item to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated item,
     * or with status 400 (Bad Request) if the item is not valid,
     * or with status 500 (Internal Server Error) if the item couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/items")
    @Timed
    public ResponseEntity<Item> updateItem(@RequestBody Item item) throws URISyntaxException {
        log.debug("REST request to update Item : {}", item);
        if (item.getId() == null) {
            return createItem(item);
        }
        Item result = itemService.save(item);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, item.getId().toString()))
            .body(result);
    }

    /**
     * GET  /items : get all the items.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of items in body
     */
    @GetMapping("/items")
    @Timed
    public List<Item> getAllItems() {
        log.debug("REST request to get all Items");
        return itemService.findAll();
        }

    /**
     * GET  /items/:id : get the "id" item.
     *
     * @param id the id of the item to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the item, or with status 404 (Not Found)
     */
    @GetMapping("/items/{id}")
    @Timed
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        log.debug("REST request to get Item : {}", id);
        Item item = itemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(item));
    }

    /**
     * DELETE  /items/:id : delete the "id" item.
     *
     * @param id the id of the item to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/items/{id}")
    @Timed
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        log.debug("REST request to delete Item : {}", id);
        itemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
