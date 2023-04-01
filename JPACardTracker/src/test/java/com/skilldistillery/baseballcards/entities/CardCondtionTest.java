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

class CardConditionTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private CardCondition cardCondition;
	
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
		cardCondition = em.find(CardCondition.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		cardCondition = null;
	}

	@Test
	void test_cardCondition_entity_mapping() {
		assertNotNull(cardCondition);
		assertEquals("Near Mint or Better", cardCondition.getName());
	}

}
