package com.skilldistillery.baseballcards.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.baseballcards.entities.Card;

public interface CardRepository extends JpaRepository<Card, Integer>{

}
