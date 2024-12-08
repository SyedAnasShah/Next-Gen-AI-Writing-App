import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private readonly apiUrl = 'http://localhost:8000/api';  // Base URL for your Django backend

  constructor(private readonly http: HttpClient) {}

  /**
   * Checks grammar for the provided text.
   * @param text The input text to check grammar.
   * @returns Observable containing grammar check results.
   */
  checkGrammar(text: string): Observable<{ correctedText: string; errors: any[] }> {
    return this.http
      .post<{ correctedText: string; errors: any[] }>(`${this.apiUrl}/check-grammar/`, { text })
      .pipe(catchError(this.handleError));
  }

  /**
   * Recommends content based on the provided topic.
   * @param topic The topic for which content recommendations are needed.
   * @returns Observable containing recommended content.
   */
  recommendContent(topic: string): Observable<{ recommendations: string[] }> {
    return this.http
      .post<{ recommendations: string[] }>(`${this.apiUrl}/recommend-content/`, { topic })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors.
   * @param error The HTTP error response.
   * @returns Observable throwing an error message.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 'Server error occurred. Please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}
