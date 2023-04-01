package com.skilldistillery.baseballcards.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CardGradeTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private CardGrade grade;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPACardTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		grade = em.find(CardGrade.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		grade = null;
	}

	@Test
	void test_card_entity_mapping() {
		assertNotNull(grade);
		assertEquals("Poor to Fair", grade.getName());
	}
	
	@Test
	void test_OneToMany_mapping() {
		grade = em.find(CardGrade.class, 8);
		assertNotNull(grade.getCards());
		assertFalse(grade.getCards().isEmpty());
	}

}
