package com.skilldistillery.baseballcards.services;

import java.util.List;

import com.skilldistillery.baseballcards.entities.Card;

public interface CardService {

	List<Card> listAllCards();
	Card getCard(int cardId);
	Card create(Card card);
	Card update(int cardId, Card card);
	boolean deleteById(int cardId);
}
