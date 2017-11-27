package com.timeslicers.repository;

import com.timeslicers.domain.Item;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    @Query("select distinct item from Item item left join fetch item.isAts")
    List<Item> findAllWithEagerRelationships();

    @Query("select item from Item item left join fetch item.isAts where item.id =:id")
    Item findOneWithEagerRelationships(@Param("id") Long id);

}
