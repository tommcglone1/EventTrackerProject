package com.skilldistillery.baseballcards.services;

import com.skilldistillery.baseballcards.entities.Card;

public interface UserService {

	boolean removeFromCards(String username, int cardId);
	
	boolean addCardToCollection(String username, Card card);
}
