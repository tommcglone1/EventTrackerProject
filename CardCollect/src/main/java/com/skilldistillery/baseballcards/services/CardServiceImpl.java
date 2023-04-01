package com.skilldistillery.baseballcards.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.repositories.CardRepository;
@Service
public class CardServiceImpl implements CardService {

	@Autowired
	private CardRepository cardRepo;
	@Override
	public List<Card> listAllCards() {
		return cardRepo.findAll();
		
	}

	@Override
	public Card getCard(int cardId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Card create(Card card) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Card update(int cardId, Card card) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteById(int cardId) {
		// TODO Auto-generated method stub
		return false;
	}

}
