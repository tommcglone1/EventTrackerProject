package com.skilldistillery.baseballcards.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.baseballcards.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username);
}
