package com.timeslicers.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Events.
 */
@Entity
@Table(name = "events")
public class Events implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "time_of_event")
    private ZonedDateTime timeOfEvent;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Timelines inTimeline;

    @ManyToOne
    private Location occursAt;

    @ManyToMany(mappedBy = "attends")
    @JsonIgnore
    private Set<Persona> participants = new HashSet<>();

    @ManyToMany(mappedBy = "isAts")
    @JsonIgnore
    private Set<Item> hasItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Events name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getTimeOfEvent() {
        return timeOfEvent;
    }

    public Events timeOfEvent(ZonedDateTime timeOfEvent) {
        this.timeOfEvent = timeOfEvent;
        return this;
    }

    public void setTimeOfEvent(ZonedDateTime timeOfEvent) {
        this.timeOfEvent = timeOfEvent;
    }

    public String getDescription() {
        return description;
    }

    public Events description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timelines getInTimeline() {
        return inTimeline;
    }

    public Events inTimeline(Timelines timelines) {
        this.inTimeline = timelines;
        return this;
    }

    public void setInTimeline(Timelines timelines) {
        this.inTimeline = timelines;
    }

    public Location getOccursAt() {
        return occursAt;
    }

    public Events occursAt(Location location) {
        this.occursAt = location;
        return this;
    }

    public void setOccursAt(Location location) {
        this.occursAt = location;
    }

    public Set<Persona> getParticipants() {
        return participants;
    }

    public Events participants(Set<Persona> personas) {
        this.participants = personas;
        return this;
    }

    public Events addParticipants(Persona persona) {
        this.participants.add(persona);
        persona.getAttends().add(this);
        return this;
    }

    public Events removeParticipants(Persona persona) {
        this.participants.remove(persona);
        persona.getAttends().remove(this);
        return this;
    }

    public void setParticipants(Set<Persona> personas) {
        this.participants = personas;
    }

    public Set<Item> getHasItems() {
        return hasItems;
    }

    public Events hasItems(Set<Item> items) {
        this.hasItems = items;
        return this;
    }

    public Events addHasItems(Item item) {
        this.hasItems.add(item);
        item.getIsAts().add(this);
        return this;
    }

    public Events removeHasItems(Item item) {
        this.hasItems.remove(item);
        item.getIsAts().remove(this);
        return this;
    }

    public void setHasItems(Set<Item> items) {
        this.hasItems = items;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Events events = (Events) o;
        if (events.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), events.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Events{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", timeOfEvent='" + getTimeOfEvent() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
