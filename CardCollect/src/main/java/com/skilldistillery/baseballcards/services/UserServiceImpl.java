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
		System.out.println(card);
		User user = userRepo.findByUsername(username);
		if (user != null) {
			
			System.out.println(card);
			user.addCard(card);
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
