import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../request.model';
import { RequestService } from '../request.service';

@Component({
  selector: 'edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {

  pendingRequest: Request = {
    reqId: 0,
    userId: 0,
    reqType: '',
    reqAmount: 0,
    reqStatus: 0,
    submitDate: '',
    approvedDate: '',
    manager: ''
  };

  constructor(private activatedRoute: ActivatedRoute,
              private requestService: RequestService,
              private router: Router) { }

  ngOnInit(): void {
    let reqId: any = this.activatedRoute.snapshot.paramMap.get("reqId");

    // fetch the book with the bookId from the service layer
    this.requestService.fetchARequest(reqId).subscribe((response)=>{
      this.pendingRequest = response;
    });
  }

  
  reviewRequest() {

    this.requestService.reviewRequest(this.pendingRequest).subscribe((response) => {
      this.pendingRequest = response;
      //this.newRequest = response;
      this.router.navigate(['request-list']);
      // console.log(this.newRequest);
    });
  }

  // reviewRequest() {
  //   console.log("this is edit")
  //   this.requestService.reviewRequest(this.pendingRequest).subscribe((response) => {
  //     console.log(response);
  //     this.router.navigate(['request-list']);
  //   });
  // }
}
