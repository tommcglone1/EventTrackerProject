package com.skilldistillery.baseballcards.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.entities.CardCondition;
import com.skilldistillery.baseballcards.entities.CardGrade;
import com.skilldistillery.baseballcards.repositories.CardConditionRepository;
import com.skilldistillery.baseballcards.repositories.CardGradeRepository;
import com.skilldistillery.baseballcards.repositories.CardRepository;
@Service
public class CardServiceImpl implements CardService {

	@Autowired
	private CardRepository cardRepo;
	@Autowired
	private CardConditionRepository ccRepo;
	@Autowired 
	private CardGradeRepository cgRepo;
	
	@Override
	public List<Card> listAllCards() {
		return cardRepo.findAll();
		
	}

	@Override
	public Card getCard(int cardId) {
		Card card = cardRepo.findById(cardId);
		return card;
	}

	@Override
	public Card create(Card card) {
		return cardRepo.saveAndFlush(card);
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
