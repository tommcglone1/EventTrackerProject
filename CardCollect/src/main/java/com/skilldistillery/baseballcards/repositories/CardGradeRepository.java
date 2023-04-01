package com.skilldistillery.baseballcards.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.baseballcards.entities.CardGrade;

public interface CardGradeRepository extends JpaRepository<CardGrade, Integer> {
	
	CardGrade findById(int cardGradeId);
}
