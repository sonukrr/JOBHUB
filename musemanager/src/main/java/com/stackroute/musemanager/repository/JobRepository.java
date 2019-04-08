package com.stackroute.musemanager.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.musemanager.domain.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer>{

	Optional<Job> findByJobIdAndUserId(String jobId , String userId);
	
	List<Job> findByUserId(String userId);
}
