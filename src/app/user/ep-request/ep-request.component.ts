import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/reimbursement/request.service';
import { Request } from 'src/app/reimbursement/request.model';
import { Account } from 'src/app/account/account.model';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AccountService } from 'src/app/account/account.service';
import { ReadVarExpr } from '@angular/compiler';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private requestService: RequestService,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute, 
              private accountService: AccountService) { this.newRequest }

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

  loadAllEpReq() {
    this.requestService.viewAllEpRequest(this.currentEmployee.userID).subscribe((response) => {
      //console.log(response);
      this.allEpRequests = response;
    });
  }
  
  selectFile(event: any) {
    console.log(event);
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  addRequest() {
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
      console.log(response);

      this.loadAllEpReq();
    });
  }

  goToUpload(reqId: number) {
    this.router.navigate(['img-upload', reqId]);
    console.log(reqId);
  }

  deleteRequest(reqId: number) {
    this.requestService.deleteRequest(reqId).subscribe((response) => {
      //console.log(response);
      this.loadAllEpReq();
    });
  }

}
