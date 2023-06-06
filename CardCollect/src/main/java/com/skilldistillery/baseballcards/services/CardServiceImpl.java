package com.skilldistillery.baseballcards.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.entities.User;
import com.skilldistillery.baseballcards.repositories.CardRepository;
import com.skilldistillery.baseballcards.repositories.UserRepository;

@Service
public class CardServiceImpl implements CardService {

	@Autowired
	private CardRepository cardRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Card> listAllUserCards(String username) {
		return cardRepo.findByUsers_Username(username);
	}
	
	@Override
	public List<Card> listAllCards() {
		List <Card> cards = cardRepo.findAll();
		List <Card> visibleCards = new ArrayList<>();
		
		for (Card card : cards) {
			if(card.isActive()) {
				visibleCards.add(card);
			}
	}
		return visibleCards;
	}

	@Override
	public Card getCard(int cardId, String username) {
		Card card = cardRepo.findByIdAndUsers_Username(cardId, username);
		return card;
	}

	@Override
	public Card create(String username, Card card) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			card.addUser(user);
			card.setActive(true);
			 return cardRepo.saveAndFlush(card);
		}
		return null;
	}

	@Override
	public Card update(int cardId, String username, Card card) {
		Card original = cardRepo.findByIdAndUsers_Username(cardId, username);
		
		if (original != null) {
			original.setPlayerName(card.getPlayerName());
			original.setNumber(card.getNumber());
			original.setTeam(card.getTeam());
			original.setBoxSet(card.getBoxSet());
			original.setType(card.getType());
			original.setImgURL(card.getImgURL());
			original.setYear(card.getYear());
			original.setAutographed(card.getAutographed());
			original.setManufacturer(card.getManufacturer());
			original.setSaleValue(card.getSaleValue());
			original.setTradeValue(card.getTradeValue());
			original.setActive(card.isActive());
			original.setSpNumber(card.getSpNumber());
			original.setParallel(card.getParallel());
			original.setCondition(card.getCondition());
			
				original.setGrade(card.getGrade());
			
		}
		return cardRepo.saveAndFlush(original);
	}

//	@Override
//	public boolean delete(String username, int cardId) {
//		boolean deleted = false;
//		Card toDelete = cardRepo.findByIdAndUsers_Username(username, cardId);
//		if (toDelete != null) {
//			cardRepo.delete(toDelete);
//			deleted = true;
//		}
//		return deleted;
//	} will be later reserved for admin

	@Override
	public List<Card> findByPlayerNameLikeIgnoreCase(String playerName) {
		playerName = "%" + playerName + "%";
		return cardRepo.findByPlayerNameLikeIgnoreCase(playerName);
	}

	@Override
	public long countByPlayerNameLikeIgnoreCase(String playerName) {
		long numberOfCards = cardRepo.countByPlayerNameLikeIgnoreCase(playerName);
		return numberOfCards;
	}

	@Override
	public List<Card> findByTeamIgnoreCase(String teamName) {
		return cardRepo.findByTeamIgnoreCase(teamName);
	}

	@Override
	public long countByTeamIgnoreCase(String teamName) {
		return cardRepo.countByTeamIgnoreCase(teamName);
		
	}

	@Override
	public List<Card> findByBoxSetAndYear(String boxSet, int year) {
		return cardRepo.findByBoxSetIgnoreCaseAndYear(boxSet, year);
	}

	@Override
	public long countByBoxSetAndYear(String boxSet, int year) {
		return cardRepo.countByBoxSetIgnoreCaseAndYear(boxSet, year);
	}

	@Override
	public List<Card> findByAutographedTrue() {
		return cardRepo.findByAutographedTrue();
	}

	@Override
	public long countByAutographedTrue() {
		return cardRepo.countByAutographedTrue();
	}

	@Override
	public List<Card> findByAutographedFalse() {
		return cardRepo.findByAutographedFalse();
	}

	@Override
	public long countByAutographedFalse() {
		return cardRepo.countByAutographedFalse();
	}

	@Override
	public List<Card> findByRookieTrue() {
		return cardRepo.findByRookieTrue();
	}

	@Override
	public long countByRookieTrue() {
		return cardRepo.countByRookieTrue();
	}

	@Override
	public List<Card> findByRookieFalse() {
		return cardRepo.findByRookieFalse();
	}

	@Override
	public long countByRookieFalse() {
		return cardRepo.countByRookieFalse();
	}

	@Override
	public List<Card> findByManufacturerIgnoreCase(String manufacturer) {
		return cardRepo.findByManufacturerIgnoreCase(manufacturer);
	}

	@Override
	public long countByManufacturerIgnoreCase(String manufacturer) {
		return cardRepo.countByManufacturerIgnoreCase(manufacturer);
	}

	@Override
	public List<Card> findByGrade_IdOrderByPlayerName(Integer gradeId) {
		return cardRepo.findByGrade_IdOrderByPlayerName(gradeId);
	}

	@Override
	public long countByGrade_Id(Integer gradeId) {
		return cardRepo.countByGrade_Id(gradeId);
	}

	@Override
	public List<Card> findByGradeIsNullOrderByPlayerName() {
		return cardRepo.findByGradeIsNullOrderByPlayerName();
	}

	@Override
	public long countByGradeIsNull() {
		return cardRepo.countByGradeIsNull();
	}

	@Override
	public List<Card> findBySaleValueBetween(double low, double high) {
		return cardRepo.findBySaleValueBetween(low, high);
	}

	@Override
	public List<Card> findByTradeValueBetween(double low, double high) {
		return cardRepo.findByTradeValueBetween(low, high);
		
	}

	@Override
	public List<Card> findByCondition_IdOrderByPlayerName(int conditionId) {
		return cardRepo.findByCondition_IdOrderByPlayerName(conditionId);
	}

	@Override
	public long countByCondition_Id(int conditionId) {
		return cardRepo.countByCondition_Id(conditionId);
	}

	

}
