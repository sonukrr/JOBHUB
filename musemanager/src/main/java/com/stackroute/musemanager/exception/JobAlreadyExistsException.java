package com.stackroute.musemanager.exception;

@SuppressWarnings("serial")
public class JobAlreadyExistsException extends Exception {

	String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public JobAlreadyExistsException() {
		// TODO Auto-generated constructor stub
	}

	public JobAlreadyExistsException(String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String toString() {
		return "JobAlreadyExistsException [message=" + message + "]";
	}

}
