package com.skilldistillery.baseballcards.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.baseballcards.entities.CardCondition;

public interface CardConditionRepository extends JpaRepository<CardCondition, Integer>{

}
