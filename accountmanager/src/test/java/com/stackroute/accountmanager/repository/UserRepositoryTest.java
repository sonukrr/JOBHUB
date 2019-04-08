package com.stackroute.accountmanager.repository;


import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;
import java.util.Optional;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.accountmanager.model.User;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class UserRepositoryTest {

	@Autowired
	private UserRepository userRepo;
	
	private User user;
	
	
	@Before
	public void setUp() throws Exception {
		user = new User("sonukrr", "Sonu", "Kumar", "Pass@1234",new Date());
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void testRegisterUserSuccess() {
		userRepo.save(user);
		Optional<User> option = userRepo.findById(user.getUserId());
		assertThat(option.equals(user));
	}
	

	@Test
	public void findByUserIdAndPassword() {
		userRepo.save(user);
		User testUser = userRepo.findByUserIdAndPassword("sonukrr", "Pass@1234");
		System.out.println(user+ "   "+testUser);
		assertThat(testUser.equals(user));
	}
	
	@Test
	public void findById() {
		Optional<User> testUser = userRepo.findById("sonukrr");
		assertThat(testUser.equals(user));
	}

}
