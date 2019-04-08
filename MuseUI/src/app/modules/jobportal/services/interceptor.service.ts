import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private auth : AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
const museApi = "https://www.themuse.com/api";
    if(request.url.search(museApi) == -1)
    {
    request = request.clone({
setHeaders: {
  Authorization: `Bearer ${this.auth.getToken()}`
}
    });
  }
    return next.handle(request);
    
  }
}