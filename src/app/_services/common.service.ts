import { AuthenticationService } from './authentication.service';
import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root",
})
export class CommonService {

    BASE_URL = environment.apiUrl;

    constructor(private httpClient: HttpClient,) {
    }

    // Delete request
    deleteRequest(endPoint: any): Observable<any> {
        const url = `${this.BASE_URL}${endPoint}`;
        return this.httpClient.delete(url);
    }

    // Post request
    postRequest(endPoint: any, data: any): Observable<any> {
        const url = `${this.BASE_URL}${endPoint}`;
        return this.httpClient.post(url, JSON.stringify(data));
    }

    // put request
    putRequest(endPoint: any, data?: any): Observable<any> {
        const url = `${this.BASE_URL}${endPoint}`;
        return this.httpClient.put(url, data);
    }

    patchRequest(endPoint: any, data?: any): Observable<any> {
        const url = `${this.BASE_URL}${endPoint}`;
        return this.httpClient.patch(url, data);
    }

    postExtRequest(apiUrl: any, data: any): Observable<any> {
        const url = `${apiUrl}`;
        return this.httpClient.post(url, JSON.stringify(data));
    }

}