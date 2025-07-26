import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private genkitUrl = 'http://localhost:4000/flows/storyFlow?stream=true'; // Genkit server URL

  constructor(private http: HttpClient) {}

  generateStory(prompt: string): Observable<any> {
    return this.http.post<any>(this.genkitUrl, { input: prompt });
  }
}
