import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.model';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  viewAllRequest(): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:5555/api/requests");
  }

  viewAllEpRequest(userId: any): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:5555/api/epRequest/"+userId);
  }
  
  addRequest(requestModel: Request): Observable<Request> {
    return this.http.post<Request>("http://localhost:5555/api/requests", requestModel);
  }

  fetchARequest(reqId: any): Observable<Request> {
    return this.http.get<Request>("http://localhost:5555/api/requests/"+reqId);
  }
  
  viewPendingRequest(): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:5555/api/pendings");
  }

  reviewRequest(requestModel: Request): Observable<Request> {
    return this.http.put<Request>("http://localhost:5555/api/requests", requestModel);
    // return this.http.put<Request>("http://localhost:4040/api/requests"+reqId+"/"+status);
    //return this.http.put<Request>("http://localhost:4040/api/requests/",JSON.stringify([reqId, reqStatus]));
    // return this.http.put<any>(`http://localhost:4040/api/requests/${reqId}/${reqStatus}`,JSON.stringify(Request));
  }

  deleteRequest(reqId: number): Observable<Request>{
    return this.http.delete<Request>("http://localhost:5555/api/requests/"+reqId);
  }
}
