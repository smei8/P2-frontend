import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  newUser: User = {
    username: "",
    password: "",
    role_id: 0
  };
  
  errorMessage: string = "";

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  validateUser() {
    this.userService.login(this.newUser).subscribe(response => {

      if(response.username == null) {
        // do the stuff for an empty user
        this.errorMessage = "Invalid Credentials!!";

      } else {
        if (response.role_id == 1) {
          
          this.authService.storeUser(response);
          // 2. mark that we have logged in
          this.authService.loggedIn=true;
          this.router.navigate(['manager-home']);

        } else if(response.role_id == 2) {
          
          this.authService.storeUser(response);
          this.authService.loggedIn=true;
          this.router.navigate(['employee-home']);
        }
      }
    });
  }
}
