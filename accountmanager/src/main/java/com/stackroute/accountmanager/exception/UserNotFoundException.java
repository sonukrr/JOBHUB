package com.stackroute.accountmanager.exception;

@SuppressWarnings("serial")
public class UserNotFoundException extends Exception {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public UserNotFoundException() {
		// TODO Auto-generated constructor stub
	}

	public UserNotFoundException(final String message) {
		super(message);
		this.message = message;
	}

	@Override
	public String toString() {
		return "UserNotFoundException [message=" + message + "]";
	}

}
