package com.skilldistillery.baseballcards.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.entities.CardGrade;

public interface CardRepository extends JpaRepository<Card, Integer>{

	
	List <Card> findByUser_Username(String username);
	Card findById(int cardId);
	
	List <Card> findByPlayerNameLikeIgnoreCase(String playerName);
	long countByPlayerNameLikeIgnoreCase(String playerName);
	
	List<Card> findByTeamIgnoreCase(String teamName);
	long countByTeamIgnoreCase(String teamName);
	
	List<Card> findByBoxSetIgnoreCaseAndYear(String boxSet, int year);
	long countByBoxSetIgnoreCaseAndYear(String boxSet, int year);
	
	List<Card> findByAutographedTrue();
	long countByAutographedTrue();
	List<Card> findByAutographedFalse();
	long countByAutographedFalse();
	
	List<Card> findByRookieTrue();
	long countByRookieTrue();
	List<Card> findByRookieFalse();
	long countByRookieFalse();
	
	List<Card> findByManufacturerIgnoreCase(String manufacturer);
	long countByManufacturerIgnoreCase(String manufacturer);
	
	List<Card> findByGrade_IdOrderByPlayerName(Integer gradeId);
	long countByGrade_Id(Integer gradeId);
	
	List<Card> findByGradeIsNullOrderByPlayerName();
	long countByGradeIsNull();
	
	List<Card> findBySaleValueBetween(double low, double high);
	
	List<Card> findByTradeValueBetween(double low, double high);
	
	List<Card> findByCondition_IdOrderByPlayerName(int conditionId);
	long countByCondition_Id(int conditionId);
	
}
