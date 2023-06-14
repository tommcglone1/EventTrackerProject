package com.skilldistillery.baseballcards.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.baseballcards.entities.Card;
import com.skilldistillery.baseballcards.entities.User;
import com.skilldistillery.baseballcards.repositories.CardRepository;
import com.skilldistillery.baseballcards.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepo;
	@Autowired
	CardRepository cardRepo;
	
	@Override
	public boolean addCardToCollection(String username, Card card) {
		boolean added = false;
		Card newCard = new Card();
		
		User user = userRepo.findByUsername(username);
		if (user != null) {
			if (card != null) {
				
				newCard.setPlayerName(card.getPlayerName());
				newCard.setNumber(card.getNumber());
				newCard.setTeam(card.getTeam());
				newCard.setBoxSet(card.getBoxSet());
				newCard.setType(card.getType());
				newCard.setImgURL(card.getImgURL());
				newCard.setYear(card.getYear());
				newCard.setAutographed(card.getAutographed());
				newCard.setManufacturer(card.getManufacturer());
				newCard.setSaleValue(card.getSaleValue());
				newCard.setTradeValue(card.getTradeValue());
				newCard.setActive(card.isActive());
				newCard.setSpNumber(card.getSpNumber());
				newCard.setParallel(card.getParallel());
				newCard.setCondition(card.getCondition());
				
				newCard.setGrade(card.getGrade());
				cardRepo.saveAndFlush(newCard);
				
			}
			user.addCard(newCard);
			userRepo.saveAndFlush(user);
			added = true;
		}
		
		return added;
	}
	

	@Override
	public boolean removeFromCards(String username, int cardId) {
		boolean removed = false;
		User user = userRepo.findByUsername(username);
		Card card = cardRepo.findById(cardId);
		if(user !=null && card !=null) {
		user.removeCard(card);
		userRepo.saveAndFlush(user);
		removed=true;
		}
	
		return removed;
	}




}
