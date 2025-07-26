import { Component, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { runFlow, streamFlow } from 'genkit/beta/client';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, QuizComponent],
  templateUrl: './app.html',
})
export class App {}
