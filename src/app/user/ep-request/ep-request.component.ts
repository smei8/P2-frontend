import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/reimbursement/request.service';
import { Request } from 'src/app/reimbursement/request.model';
import { Account } from 'src/app/account/account.model';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-ep-request',
  templateUrl: './ep-request.component.html',
  styleUrls: ['./ep-request.component.css']
})
export class EpRequestComponent implements OnInit {
  
  newReqList: Request[] = [];
  currentEmployee: any = null;  //current employee info that logged in from sess.storage

  allEpRequests: Request[] = [];  //empty array to hold all current employee requests
  toggleAdd: boolean = false;
  
  newAccount: Account = {
    userID: 0,
    username: "",
    password: "",
    fullName: "",
    email: "",
    role_id: 0,
    role: ""
  }
  
  newRequest: Request = {
    reqId: 0,
    userId: 0,
    reqType: '',
    reqAmount: 0,
    reqStatus: 0,
    submitDate: '',
    approvedDate: '',
    manager: ''
  };

  constructor(private requestService: RequestService,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute, 
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentEmployee = this.authService.retrieveUser();
    //console.log(this.currentEmployee);

    this.loadAllEpReq();
  }

  toggleAddForm() {
    if(this.toggleAdd) {
      this.toggleAdd = false;
    } else {
      this.toggleAdd = true;
    }
  }

  // loadAllEpRequests() {
  //   this.requestService.viewAllRequest().subscribe((response) => {
  //     console.log(response);
  //     console.log(this.allEpRequests);
  //     this.allEpRequests = response;

  //     for(let i = 0; i < this.allEpRequests.length; i++) {
  //       if(this.allEpRequests[i].userId == this.currentEmployee.userID) {
  //         this.newReqList[i] = this.allEpRequests[i];
  //         console.log(this.newReqList);
  //       }
  //     }

  //   });

  loadAllEpReq() {
    this.requestService.viewAllEpRequest(this.currentEmployee.userID).subscribe((response) => {
      //console.log(response);
      this.allEpRequests = response;
    });
  }
    

    //this.currentEmployee = this.authService.retrieveUser();
    // this.requestService.viewAllRequest().subscribe((response) => {
    //   console.log(response);
    //   console.log(this.allEpRequests);

    //   for(let i = 0; i < response.length; i++) {
    //     if(response[i].userId == this.currentEmployee.userID) {
    //       this.allEpRequests.push(response[i]);
    //       //this.newRequest[i] = response[i];
    //       console.log(this.allEpRequests);
    //     }

    //   }

      
    //   this.newReqList = this.allEpRequests;
    // });
  

  addRequest() {
    // let userID: any = this.activatedRoute.snapshot.paramMap.get("userID");
    // console.log(userID);
    // this.accountService.fetchAAccount(userID).subscribe((response) => {
    //   console.log(response);
    //   this.newAccount = response;
    // });

    this.newRequest.userId = this.currentEmployee.userID;
    this.requestService.addRequest(this.newRequest).subscribe((response) => {

      this.newRequest = {
        reqId: 0,
        userId: 0,
        reqType: '',
        reqAmount: 0,
        reqStatus: 0,
        submitDate: '',
        approvedDate: '',
        manager: ''
      };

      this.loadAllEpReq();
    });
  }

  deleteRequest(reqId: number) {
    this.requestService.deleteRequest(reqId).subscribe((response) => {
      //console.log(response);
      this.loadAllEpReq();
    });
  }

}
