import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TopicService {

    constructor(private http: HttpClient) {
    }

    getQuestions(topic: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/topic/questions/` + topic);
    }

    getQuestion(questionId: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/question/` + questionId);
    }
}
