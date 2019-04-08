package com.stackroute.musemanager.controller;

import static org.hamcrest.CoreMatchers.is;
//to import hasSize()
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.musemanager.MusemanagerApplication;
import com.stackroute.musemanager.domain.Job;
import com.stackroute.musemanager.service.JobService;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest(classes = MusemanagerApplication.class)
public class JobcontrollerTest {

	@Autowired
	private transient MockMvc mockMvc;

	@InjectMocks
	private transient JobController controller;

	@MockBean
	private transient JobService jobService;

	private transient Job job;
	private transient List<Job> jobList = new ArrayList<>();

	transient Optional<Job> options;

	@Before
	public void setUp() {

		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
		job = new Job(0, "1111", "full stack developer", "26/3/2019", "Chennai", "CTS", "pending", "sonukrr");
		jobList.add(new Job(0, "1111", "full stack developer", "26/3/2019", "Chennai", "CTS", "pending", "sonukrr"));
		jobList.add(new Job(0, "2222", "java developer", "26/3/2019", "Delhi", "RS Components", "pending", "sonukrr"));
		jobList.add(new Job(0, "3333", "web developer", "26/3/2019", "Gurgaon", "ANR software solutions pvt ltd", "pending", "sonukrr"));
		options = Optional.of(job);
	}

	@Test
	public void testSaveNewjobSuccess() {

		try {
			Mockito.when(jobService.saveJob(job)).thenReturn(true);
			String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb251a3JyIiwiaWF0IjoxNTUzNTk1Njc4fQ.kAfheDlazTqHGR_gI_7FO1xzOu-m4sP-rRVE3eprY2k";
			mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/jobservice/job").header("authorization","Bearer "+ token).contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(job))).andExpect(status().is2xxSuccessful())
					.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
					.andExpect(jsonPath("$.name", is("full stack developer")))
					.andExpect(jsonPath("$.jobId", is("1111")))
					.andExpect(jsonPath("$.location", is("Chennai")))
					.andExpect(jsonPath("$.company", is("CTS")));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Test
	public void testUpdateMovie() {

		try {
			Mockito.when(jobService.updateJobStatus(job)).thenReturn(job);

			job.setName("full satck engineer");
			job.setStatus("applied");

			mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/jobservice/job").contentType(MediaType.APPLICATION_JSON)
					.content(asJsonString(job))).andExpect(status().is2xxSuccessful())
					.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
					.andExpect(jsonPath("$.status", is("applied")))
					.andExpect(jsonPath("$.name", is("full satck engineer")));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Test
	public void testDeleteMovieById() {

		try {

			Mockito.when(jobService.deleteJobById(job.getJobId(), job.getUserId())).thenReturn(true);
			mockMvc.perform(delete("/api/v1/jobservice/job/{id}", "1111")).andExpect(status().is2xxSuccessful())
					.andExpect(jsonPath("$.message", is("Succesfully deleted")));
			verify(jobService, times(1)).deleteJobById(job.getJobId(), job.getUserId());
			verifyNoMoreInteractions(jobService);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Test
	public void testGetMovieById() {

		try {

			Mockito.when(jobService.fetchJobById(job.getJobId(), job.getUserId())).thenReturn(job);
			mockMvc.perform(get("/api/v1/jobservice/job/{id}","1111")).andExpect(status().is2xxSuccessful())
					.andExpect(jsonPath("$.name", is("full stack developer")));
			verify(jobService, times(1)).fetchJobById("1111", "sonukrr");
			verifyNoMoreInteractions(jobService);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Test
	public void testFetchAllMovies() {
	String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb251a3JyIiwiaWF0IjoxNTUzNTk1Njc4fQ.kAfheDlazTqHGR_gI_7FO1xzOu-m4sP-rRVE3eprY2k";
		try {

			Mockito.when(jobService.fetchAlljobs("sonukrr")).thenReturn(jobList);
			mockMvc.perform(get("/api/v1/jobservice/job/fetchalljobs").header("authorization","Bearer "+token)).andExpect(status().isOk())
					.andExpect(jsonPath("$.*", hasSize(3)));
			verify(jobService, times(1)).fetchAlljobs("sonukrr");
			verifyNoMoreInteractions(jobService);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static String asJsonString(final Object obj) {
		try {
			final ObjectMapper mapper = new ObjectMapper();
			final String jsonContent = mapper.writeValueAsString(obj);
			return jsonContent;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
