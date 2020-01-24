import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME:string = 'jwt_token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  springEndPoint:string ;
  token:string;

  constructor(private http:HttpClient) {
    this.springEndPoint =  "http://localhost:8001/api/v1/userservice";
   }

  registerUser(user):any{
    const url = this.springEndPoint + "/register"
return this.http.post(url,user,{responseType :"text"});
  }

  loginUser(user):any{
    localStorage.setItem("user",user.userId);
    const url = this.springEndPoint + "/login"
    return this.http.post(url,user);
  }

  setToken(token:string){
    return localStorage.setItem(TOKEN_NAME,token);
  }

  getToken():any{
    return localStorage.getItem(TOKEN_NAME);
  }

  deleteToken():any{
    return localStorage.removeItem(TOKEN_NAME);
  }

  getTokenExpirationDate(token:string):Date{
    const decoded = jwt_decode(token);
    if(decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token?: string):boolean{
    if(!token)
    token = this.getToken();

    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined || date===null) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
