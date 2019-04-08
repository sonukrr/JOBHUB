package com.stackroute.accountmanager.service;

import java.util.Map;

import com.stackroute.accountmanager.model.User;

public interface TokenGenerator {

	Map<String , String> generateToken(User user);
}
