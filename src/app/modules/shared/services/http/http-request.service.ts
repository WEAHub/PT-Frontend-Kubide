import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IHTTPErrorResponse } from '../models/http-responses.model';


@Injectable()
export class RequestService {
  constructor(
    private http: HttpClient,
  ) { }

  httpGet(url: string): Observable<any> {
    return this.http.get(url)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  httpDelete(url: string): Observable<any> {
    return this.http.delete(url)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  httpPost(url: string, postData: object): Observable<any> {
    return this.http.post(url, postData)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  httpPut(url: string, postData: object): Observable<any> {
    return this.http.put(url, postData)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  httpPatch(url: string, postData: object): Observable<any> {
    return this.http.patch(url, postData)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse): Observable<IHTTPErrorResponse>  {

    const errorResponse: IHTTPErrorResponse = {
      message: err.error.message
    }

    return throwError(() => {
      new Error(errorResponse.message)
      return errorResponse
    });

  }
}