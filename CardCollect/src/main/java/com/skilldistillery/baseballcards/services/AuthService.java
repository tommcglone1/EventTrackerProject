package com.skilldistillery.baseballcards.services;

import com.skilldistillery.baseballcards.entities.User;

public interface AuthService {
	
	public User register(User user);
	public User getUserByUsername(String username);

}
