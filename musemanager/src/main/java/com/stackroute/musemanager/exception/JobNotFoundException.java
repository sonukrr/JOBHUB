package com.stackroute.musemanager.exception;


@SuppressWarnings("serial")
public class JobNotFoundException extends Exception {

	String message;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
 
	public JobNotFoundException() {
	// TODO Auto-generated constructor stub

	}

	public JobNotFoundException(String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String toString() {
		return "JobNotFoundException [message=" + message + "]";
	}
	
	
}
