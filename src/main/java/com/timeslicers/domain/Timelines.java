package com.timeslicers.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Timelines.
 */
@Entity
@Table(name = "timelines")
public class Timelines implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private TimelineGroups inGroup;

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

    public Timelines name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Timelines description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TimelineGroups getInGroup() {
        return inGroup;
    }

    public Timelines inGroup(TimelineGroups timelineGroups) {
        this.inGroup = timelineGroups;
        return this;
    }

    public void setInGroup(TimelineGroups timelineGroups) {
        this.inGroup = timelineGroups;
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
        Timelines timelines = (Timelines) o;
        if (timelines.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timelines.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Timelines{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
