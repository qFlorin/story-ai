import {
  Component,
  signal,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4">{{ question().question }}</h2>
      <ul>
        @for (answer of question().answers; track answer) {
        <li
          class="border rounded-md p-3 mb-3 cursor-pointer hover:bg-gray-100"
          (click)="selectAnswer(answer)"
          [class.bg-green-200]="
            selectedAnswer() === answer && isCorrect(answer)
          "
          [class.bg-red-200]="selectedAnswer() === answer && !isCorrect(answer)"
        >
          {{ answer }}
        </li>
        }
      </ul>
    </div>
  `,
  styles: [],
})
export class QuestionComponent {
  question = input.required<Question>();
  answerSelected = output<string>();

  selectedAnswer = signal<string | null>(null);

  selectAnswer(answer: string) {
    this.selectedAnswer.set(answer);
    this.answerSelected.emit(answer);
  }

  isCorrect(answer: string): boolean {
    return answer === this.question().correctAnswer;
  }
}
