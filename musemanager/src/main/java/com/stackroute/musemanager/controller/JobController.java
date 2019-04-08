package com.stackroute.musemanager.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.musemanager.domain.Job;
import com.stackroute.musemanager.exception.JobAlreadyExistsException;
import com.stackroute.musemanager.exception.JobNotFoundException;
import com.stackroute.musemanager.service.JobService;

import io.jsonwebtoken.Claims;

@RequestMapping("/api/v1/jobservice/job")
@CrossOrigin
@RestController
public class JobController {

	@Autowired
	private JobService jobService;
	
	@PostMapping()
	public ResponseEntity<?> saveNewJob(@RequestBody final Job job, HttpServletRequest req) {
		
		Claims claim =(Claims) req.getAttribute("claims");
		String userId = claim.getSubject();
		job.setUserId(userId);
		
		ResponseEntity<?> responseEntity;
		try {
			jobService.saveJob(job);
			responseEntity = new ResponseEntity<Job>(job, HttpStatus.CREATED);
		} catch (JobAlreadyExistsException e) {
			// TODO Auto-generated catch block
			responseEntity = new ResponseEntity<String>("{ \"message\" : \"" + e.getMessage() + "\"}",
					HttpStatus.CONFLICT);
		}
		return responseEntity;

	}
	
	@PutMapping()
	public ResponseEntity<?> updateJob(@RequestBody final Job job, HttpServletRequest req) {
		
		Claims claim =(Claims) req.getAttribute("claims");
		String userId = claim.getSubject();
		job.setUserId(userId);
		
		ResponseEntity<?> responseEntity;
		try {
			jobService.updateJobStatus(job);
			responseEntity = new ResponseEntity<Job>(job, HttpStatus.OK);
		} catch (JobNotFoundException e) {
			// TODO Auto-generated catch block
			responseEntity = new ResponseEntity<String>("{ \"message\" : \"" + e.getMessage() + "\"}",
					HttpStatus.NOT_FOUND);
		}
		return responseEntity;

	}
	
	@DeleteMapping(path = "/{jobId}")
	public ResponseEntity<?> deleteJobById(@PathVariable final String jobId, HttpServletRequest req) {
		
		Claims claim =(Claims) req.getAttribute("claims");
		String userId = claim.getSubject();
		
		ResponseEntity<?> responseEntity;
		try {
			jobService.deleteJobById(jobId, userId);
			responseEntity = new ResponseEntity<Object>("{\"message\":\"Succesfully deleted\"}", HttpStatus.OK);
		} catch (JobNotFoundException e) {
			// TODO Auto-generated catch block
			responseEntity = new ResponseEntity<String>("{ \"message\" : \"" + e.getMessage() + "\"}",
					HttpStatus.NOT_FOUND);
		}
		return responseEntity;

	}
	
	@GetMapping(path = "/fetchalljobs")
	public ResponseEntity<?> fetchAllJobs( final HttpServletRequest req) {

		Claims claim =(Claims) req.getAttribute("claims");
		String userId = claim.getSubject();
		ResponseEntity<?> responseEntity;
		responseEntity = new ResponseEntity<>(jobService.fetchAlljobs(userId), HttpStatus.OK);
		return responseEntity;
	}
	
	@GetMapping(path = "/{jobId}")
	public ResponseEntity<?> getMovieById(@PathVariable("jobId") final String jobId, HttpServletRequest req) {
		ResponseEntity<?> responseEntity;
		try {
			Claims claim =(Claims) req.getAttribute("claims");
			String userId = claim.getSubject();
			responseEntity = new ResponseEntity<Job>(jobService.fetchJobById(jobId, userId), HttpStatus.OK);
		} catch (JobNotFoundException e) {
			// TODO Auto-generated catch block
			responseEntity = new ResponseEntity<String>("{ \"message\" : \"" + e.getMessage() + "\"}",
					HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}
}
