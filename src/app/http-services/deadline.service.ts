import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { copyObject } from 'typescript-object-helper';
import { DeadlineModel } from '../models/deadline.model';

@Injectable({
  providedIn: 'root',
})
export class DeadlineService {
  constructor(private http: HttpClient) {}

  // getInitialDeadline(): Observable<DeadlineModel> {
  //   return this.http.get('/api/deadline').pipe(
  //     // Instantiating as object instead of using interface or casting
  //     map((response) => copyObject(response, DeadlineModel))
  //   );
  // }

  // Fake endpoint for demonstration purposes
  getInitialDeadline(): Observable<DeadlineModel> {
    return of({ secondsLeft: 1000000 }).pipe(
      // Instantiating as object instead of using interface or casting
      map((response) => copyObject(response, DeadlineModel))
    );
  }
}
