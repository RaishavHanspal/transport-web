import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient, private router: Router) { }

  /** common function to handle all post api calls to transport-api */
  public postRequest(endpoint: string, requestBody: any): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient.post(`${environment.host}${endpoint}`, requestBody, { headers });
  }

  /** common function to handle all post api calls to transport-api */
  public getRequest(endpoint: string): Observable<any> {
    const headers = new HttpHeaders();
    return this.httpClient.get(`${environment.host}${endpoint}`, { headers });
  }

  /** login status handle using service to be accessible everywhere */
  public setLoggedIn(username?: string): void{
    if(username){
      localStorage.setItem("username", username);
    }
    else{
      localStorage.removeItem("username");
    }
  }

  /** get login status from localhost - @todo - might need to use some token/guest-id */
  public getLoggedInUser(): string{
    return localStorage.getItem("username") || "";
  }
}
