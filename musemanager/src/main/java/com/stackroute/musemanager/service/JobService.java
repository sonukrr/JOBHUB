package com.stackroute.musemanager.service;

import java.util.List;

import com.stackroute.musemanager.domain.Job;
import com.stackroute.musemanager.exception.JobAlreadyExistsException;
import com.stackroute.musemanager.exception.JobNotFoundException;



public interface JobService {

	boolean saveJob(Job job) throws JobAlreadyExistsException;
	
	Job updateJobStatus(Job job) throws JobNotFoundException;
	
	boolean deleteJobById(String id , String userId) throws JobNotFoundException;
	
	Job fetchJobById(String jobId, String userId) throws JobNotFoundException;
	
	List<Job> fetchAlljobs(String userId) ;
}
