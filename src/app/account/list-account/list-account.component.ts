import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  allAccount: Account[] = [];
  toggleAdd: boolean = false;

  newAccount: Account = {
    userID: 0,
    username: '',
    password: '',
    fullName: '',
    email: '',
    role_id: 0,
    role: ''
  }
  
  constructor(private accountService: AccountService, 
              private router: Router) { }

  ngOnInit(): void {
    this.loadAllAccount();
  }

  toggleAddForm() {
    if(this.toggleAdd) {
      this.toggleAdd = false;
    } else {
      this.toggleAdd = true;
    }
  }

  loadAllAccount() {
    this.accountService.fetchAllAccount().subscribe((response) => {
      this.allAccount = response;
    });
  }

  goToEditBook(userId: number) {
    //route to edit account component, paht is account-edit
    this.router.navigate(['account-edit', userId]);
  }

  // addAccount() {
  //   this.accountService.addAccount(this.newAccount)
  // }

  // deleteAccount(userId: number) {
    
  // }
}
