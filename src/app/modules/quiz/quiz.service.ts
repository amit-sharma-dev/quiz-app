import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/question`);
    }
}
