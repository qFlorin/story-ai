import {
  Component,
  signal,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizHistoryItem {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-md rounded-lg p-6 text-center">
      @if (score() >= 7) {
      <h2 class="text-2xl font-bold mb-4 text-green-600">You Passed!</h2>
      } @else {
      <h2 class="text-2xl font-bold mb-4 text-red-600">You Failed.</h2>
      }
      <p class="text-xl mb-4">
        You got {{ score() }}/{{ totalQuestions() }} questions correct.
      </p>
      <div class="text-left mb-4">
        <h3 class="text-lg font-semibold mb-2">Quiz History:</h3>
        @for (item of quizHistory(); track item.question) {
        <div class="mb-2">
          <p><strong>Q:</strong> {{ item.question }}</p>
          <p>
            <strong>Your Answer:</strong> {{ item.selectedAnswer }}
            @if (item.isCorrect) {
            <span class="text-green-600">(Correct)</span>
            } @else {
            <span class="text-red-600">(Wrong)</span>
            <strong>Correct Answer:</strong> {{ item.correctAnswer }}
            }
          </p>
        </div>
        }
      </div>
      <button
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        (click)="restart.emit()"
      >
        Restart Quiz
      </button>
    </div>
  `,
  styles: [],
})
export class SummaryComponent {
  score = input.required<number>();
  totalQuestions = input.required<number>();
  quizHistory = input.required<QuizHistoryItem[]>();
  restart = output<void>();
}
