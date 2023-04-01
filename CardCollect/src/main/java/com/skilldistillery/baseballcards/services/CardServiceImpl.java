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
		Card original = cardRepo.findById(cardId);
		original.setPlayerName(card.getPlayerName());
		original.setNumber(card.getNumber());
		original.setTeam(card.getTeam());
		original.setBoxSet(card.getBoxSet());
		original.setType(card.getType());
		original.setImgURL(card.getImgURL());
		original.setYear(card.getYear());
		original.setAutographed(card.getAutographed());
		original.setRookie(card.getRookie());
		original.setManufacturer(card.getManufacturer());
		original.setSaleValue(card.getSaleValue());
		original.setTradeValue(card.getTradeValue());
		original.setActive(card.isActive());
		original.setSpNumber(card.getSpNumber());
		original.setParallel(card.getParallel());
		original.setCondition(card.getCondition());
		if(card.getGrade() != null) {
		original.setGrade(card.getGrade());
		}
		return cardRepo.saveAndFlush(card);
	}

	@Override
	public boolean deleteById(int cardId) {
		boolean deleted = false;
		Card toDelete = cardRepo.findById(cardId);
		if (toDelete != null) {
			cardRepo.delete(toDelete);
			deleted = true;
		}
		return deleted;
	}

}
