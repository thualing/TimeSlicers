package com.timeslicers.repository;

import com.timeslicers.domain.TimelineGroups;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the TimelineGroups entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimelineGroupsRepository extends JpaRepository<TimelineGroups, Long> {

    @Query("select timeline_groups from TimelineGroups timeline_groups where timeline_groups.owner.login = ?#{principal.username}")
    List<TimelineGroups> findByOwnerIsCurrentUser();

}
