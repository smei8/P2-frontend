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
      //console.log(response);
      //let receivedUser: User = response;
      // if I received am empty user 
      //console.log(response.username)
      if(response.username == null) {
        // do the stuff for an empty user
        this.errorMessage = "Invalid Credentials!!";
        //console.log("BAD CREDENTIAL")

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
    // let returnUser: User = this.userSerivce.valiadteUser(this.newUser);

    // if(returnUser.userName == "") {
    //   // invalid 
    //   this.errorMessage = "Invalid Credentials!!"
    // } else {
    //   if(returnUser.role_id == 1) {
    //     this.router.navigate(['request-crud']);
    //   } else {
    //     this.router.navigate(['acount-crud']);
    //   }
    //   //logged in
    //   console.log("Logged in successful!")
    // }
  }
}
