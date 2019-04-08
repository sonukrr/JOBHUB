package com.stackroute.musemanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.musemanager.domain.Job;
import com.stackroute.musemanager.exception.JobAlreadyExistsException;
import com.stackroute.musemanager.exception.JobNotFoundException;
import com.stackroute.musemanager.repository.JobRepository;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepo;
	
	@Override
	public boolean saveJob(Job job) throws JobAlreadyExistsException {
		// TODO Auto-generated method stub
		Optional<Job> fetchedJob = jobRepo.findByJobIdAndUserId(job.getJobId(), job.getUserId());
		if(fetchedJob.isPresent() )
		{
			throw new JobAlreadyExistsException("Can't save. Job already exists");
		}
		else jobRepo.save(job);
		return true;
	}

	@Override
	public Job updateJobStatus(Job job) throws JobNotFoundException {
		// TODO Auto-generated method stub
		Job savedJob = new Job();
		Optional<Job> fetchedJob = jobRepo.findByJobIdAndUserId(job.getJobId(), job.getUserId());
		if(!fetchedJob.isPresent() )
		{
			throw new JobNotFoundException("Can't Update. Job does not exists");
		}
		else 
			{
			job.setId(fetchedJob.get().getId());
			savedJob = jobRepo.save(job);
			}
		return savedJob;
	}

	@Override
	public boolean deleteJobById(String jobId, String userId) throws JobNotFoundException {
		// TODO Auto-generated method stub
		Optional<Job> fetchedJob = jobRepo.findByJobIdAndUserId(jobId, userId);
		if(!fetchedJob.isPresent() )
		{
			throw new JobNotFoundException("Can't Delete. Job does not exists");
		}
		else 
			{
			jobRepo.delete(fetchedJob.get());
			}
		return true;
	}

	@Override
	public List<Job> fetchAlljobs(String userId) {
		// TODO Auto-generated method stub
		return jobRepo.findByUserId(userId);
	}

	@Override
	public Job fetchJobById(String jobId, String userId) throws JobNotFoundException {
		// TODO Auto-generated method stub
		Optional<Job> fetchedJob = jobRepo.findByJobIdAndUserId(jobId, userId);
		if(!fetchedJob.isPresent() )
		{
			throw new JobNotFoundException("Error in fetching. Job does not exists");
		}
		else 
			return fetchedJob.get();
	}

}
