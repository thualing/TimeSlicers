package com.timeslicers.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User name;

    @ManyToMany
    @JoinTable(name = "persona_attends",
               joinColumns = @JoinColumn(name="personas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="attends_id", referencedColumnName="id"))
    private Set<Events> attends = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getName() {
        return name;
    }

    public Persona name(User user) {
        this.name = user;
        return this;
    }

    public void setName(User user) {
        this.name = user;
    }

    public Set<Events> getAttends() {
        return attends;
    }

    public Persona attends(Set<Events> events) {
        this.attends = events;
        return this;
    }

    public Persona addAttends(Events events) {
        this.attends.add(events);
        events.getParticipants().add(this);
        return this;
    }

    public Persona removeAttends(Events events) {
        this.attends.remove(events);
        events.getParticipants().remove(this);
        return this;
    }

    public void setAttends(Set<Events> events) {
        this.attends = events;
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
        Persona persona = (Persona) o;
        if (persona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            "}";
    }
}
