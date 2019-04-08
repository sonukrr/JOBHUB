package com.stackroute.musemanager.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.musemanager.domain.Job;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Transactional
public class JobRepositoryTest {
	

	@Autowired
	private transient JobRepository repo;


	private transient Job job;

	Optional<Job> options;

	@Before
	public void setUp() {
		job = new Job(0, "1111", "full stack developer", "26/3/2019", "Chennai", "CTS", "pending", "sonukrr");
		options = Optional.of(job);
	}

	@After
	public void tearDown() {
		repo.deleteAllInBatch();
	}

	@Test
	public void testSaveJob() {
		final Job savedJob = repo.save(job);
		final Job fetchedJob = repo.findById(savedJob.getId()).get();
		assertThat(fetchedJob.getId()).isEqualTo(savedJob.getId());
	}

	@Test
	public void testUpdateJob() {
		repo.save(job);
		final Job fetchedJob = repo.findByJobIdAndUserId("1111","sonukrr" ).get();
		assertEquals(fetchedJob.getName(), "full stack developer");
		job.setName("full satck engineer");
		job.setStatus("Applied");
		final Job fetchedUpdatedJob = repo.findByJobIdAndUserId("1111","sonukrr" ).get();
		assertEquals("Applied", fetchedUpdatedJob.getStatus());
	}

	@Test
	public void testDeleteJob() {
		repo.save(job);
		final Job fetchedJob = repo.findByJobIdAndUserId("1111","sonukrr" ).get();
		assertEquals(fetchedJob.getName(), "full stack developer");
		repo.delete(fetchedJob);
		assertThat(repo.existsById(fetchedJob.getId())).isEqualTo(false);
	}

	@Test
	public void testGetAJob() {
		repo.save(job);
		final Job fetchedJob = repo.findByJobIdAndUserId("1111","sonukrr" ).get();
		assertEquals(fetchedJob.getName(), "full stack developer");

	}

	@Test
	public void testGetAllJobs() {
	
		repo.save(new Job(0, "1111", "full stack developer", "26/3/2019", "Chennai", "CTS", "pending", "sonukrr"));
		repo.save(new Job(0, "2222", "java developer", "26/3/2019", "Delhi", "RS Components", "pending", "sonukrr"));
		repo.save(new Job(0, "3333", "web developer", "26/3/2019", "Gurgaon", "ANR software solutions pvt ltd", "pending", "sonukrr"));

		List<Job> movieList = repo.findByUserId("sonukrr");
		assertEquals(movieList.get(0).getName(), "full stack developer");
		assertEquals(movieList.get(1).getName(), "java developer");
		assertEquals(movieList.get(2).getName(), "web developer");
		
	}
}

