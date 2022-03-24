import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { RequestService } from '../reimbursement/request.service';
import { AuthService } from './auth.service';
import { User } from './login/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  allAccounts: Account [] = [];

  constructor(private authService: AuthService, 
              private http: HttpClient) { }


              
login(user: User): Observable<User>{
  // const httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})
  // }
  console.log(user);

  return this.http.post<any>("http://localhost:5555/api/login", user);
}

  // valiadteUser(newUser: User): User {
  //   if(newUser.role_id==1 && newUser.userName=="bruno01" && newUser.password=="nonono") {
  //     //1. store user information in browser storage
  //     this.authService.storeUser(newUser);

  //     //2. mark that we have logged in
  //     this.authService.loggedIn = true;

  //   } else if(newUser.role_id==2 && newUser.userName=="levi01" && newUser.password=="Levi631") {
  //     //1. store user information in browser storage
  //     this.authService.storeUser(newUser);

  //     //2. mark that we have logged in
  //     this.authService.loggedIn = true; 

  //   } else {
  //     newUser = {
  //       userName: "",
  //       password: "",
  //       role_id: 0
  //     }
  //   }
  //   return newUser;
  // }
}
