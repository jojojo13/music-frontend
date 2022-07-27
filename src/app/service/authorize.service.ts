import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  
  constructor(private http: HttpClient) {}
  token=localStorage.getItem('token')
  login(data: Object) {
    return this.http.post('https://music-jojojo13.herokuapp.com/login', data);
  }

  isLogged = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.isLogged.asObservable();
  }

  createAccount(user:Object){
    return this.http.post('https://music-jojojo13.herokuapp.com/createAccount',user)
  }
}
