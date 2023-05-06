package com.skilldistillery.baseballcards.services;

import java.util.List;

import com.skilldistillery.baseballcards.entities.Card;

public interface CardService {

	List<Card> listAllCards(String username);
	Card getCard(int cardId);
	Card create(Card card); 
	Card update(int cardId, Card card);
	boolean deleteById(int cardId);
	
	List <Card> findByPlayerNameLikeIgnoreCase(String playerName);
	long countByPlayerNameLikeIgnoreCase(String playerName);
	
	List<Card> findByTeamIgnoreCase(String teamName);
	long countByTeamIgnoreCase(String teamName);
	
	List<Card> findByBoxSetAndYear(String boxSet, int year);
	long countByBoxSetAndYear(String boxSet, int year);
	
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
