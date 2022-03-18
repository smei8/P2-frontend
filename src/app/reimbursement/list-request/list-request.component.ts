import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {

  pendingReq: boolean = false;
  pendingStatus: number = 0;
  noPendingMessage: string = "";

  allRequests: Request[] = [];
  allPRequests: Request[] = [];

  togglePReq: boolean = false;
  toggleRequests: boolean = false;
  
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
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllRequests();
    this.loadPendingRequset();
  }

  togglePending() {
    if(this.togglePReq) {
      this.togglePReq = false;
    } else {
      this.togglePReq = true;
    }
  }

  toggleAllRequests() {
    if(this.toggleRequests) {
      this.toggleRequests = false;
    } else {
      this.toggleRequests = true;
    }
  }

  yesClicked() {
    this.pendingReq = true;
  }

  loadAllRequests() {
    //this has current manager info that logged in
    let currentManager: any = this.authService.retrieveUser();
    //console.log(currentManager);

    //get all requests from the backend and stored in response
    this.requestService.viewAllRequest().subscribe((response) => {
      console.log(response); // a list of all requests

      for(let i = 0; i < response.length; i++) {
        if(response[i].manager == currentManager.userID) {
          //console.log(this.allRequests[i]);
          this.allRequests.push(response[i]);
        }  
      }
    });
  }
  
  loadPendingRequset() {
    let currentUser: any = this.authService.retrieveUser();
    this.requestService.viewAllRequest().subscribe((response) => {
      //console.log(response);

      for(let i = 0; i < response.length; i++) {
        if(response[i].reqStatus==1 && response[i].manager==currentUser.userID) {
          //console.log(response[i]);
          this.allPRequests.push(response[i]);
          //console.log(this.allPRequests);
        } else {
          this.noPendingMessage="No Pending Request Yet"
        }
      }
    });
  }

  goToReviewRequest(request: Request) {
    //console.log("entering goToReview");
    //console.log(request);
    // let currentRequest: any = this.requestService.fetchARequest(this.newRequest.reqId);
    // this.newRequest = {
    //   reqId: currentRequest.reqId,
    //   userId: currentRequest.userId,
    //   reqType: currentRequest.reqType,
    //   reqAmount: currentRequest.reqAmount,
    //   reqStatus: currentRequest.reqStatus,
    //   submitDate: currentRequest.submitDate,
    //   approvedDate: currentRequest.approvedDate,
    //   manager: currentRequest.manager
    // };
    this.router.navigate(['edit-request', request]);
  }
}

