import {
  Component,
  signal,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { QuestionComponent } from './quiestion.component';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface QuizHistoryItem {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, QuestionComponent, SummaryComponent],
  template: `
    <div class="container mx-auto p-4">
      @if (currentQuestionIndex() < questions.length) {
      <app-question
        [question]="questions[currentQuestionIndex()]"
        (answerSelected)="handleAnswerSelected($event)"
      ></app-question>
      <div class="mt-4 text-sm text-gray-600 text-center">
        {{ currentQuestionIndex() + 1 }}/{{ questions.length }}
      </div>
      } @else {
      <app-summary
        [score]="score()"
        [totalQuestions]="questions.length"
        [quizHistory]="quizHistory()"
        (restart)="restartQuiz()"
      ></app-summary>
      }
    </div>
  `,
  styles: [],
})
export class QuizComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  questions = [
    {
      question: 'What is the capital of France?',
      answers: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Jupiter',
    },
    {
      question: 'What is the chemical symbol for water?',
      answers: ['O2', 'H2O', 'CO2', 'NaCl'],
      correctAnswer: 'H2O',
    },
    {
      question: 'What is the highest mountain in the world?',
      answers: ['K2', 'Kangchenjunga', 'Lhotse', 'Mount Everest'],
      correctAnswer: 'Mount Everest',
    },
    {
      question: 'What is the currency of Japan?',
      answers: ['Yuan', 'Won', 'Yen', 'Dollar'],
      correctAnswer: 'Yen',
    },
    {
      question: 'What is the largest ocean on Earth?',
      answers: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Arctic Ocean',
        'Pacific Ocean',
      ],
      correctAnswer: 'Pacific Ocean',
    },
    {
      question: 'What is the longest river in the world?',
      answers: [
        'Amazon River',
        'Nile River',
        'Yangtze River',
        'Mississippi River',
      ],
      correctAnswer: 'Nile River',
    },
    {
      question: 'What is the chemical symbol for gold?',
      answers: ['Ag', 'Au', 'Fe', 'Cu'],
      correctAnswer: 'Au',
    },
    {
      question: 'What is the capital of Italy?',
      answers: ['Berlin', 'Rome', 'Madrid', 'Paris'],
      correctAnswer: 'Rome',
    },
    {
      question: 'What is the powerhouse of the cell?',
      answers: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
      correctAnswer: 'Mitochondria',
    },
  ];

  currentQuestionIndex = signal(0);
  score = signal(0);
  quizHistory = signal<QuizHistoryItem[]>([]);

  ngOnInit() {
    this.loadProgress();
  }

  handleAnswerSelected(answer: string) {
    const currentQuestion = this.questions[this.currentQuestionIndex()];
    const isCorrect = answer === currentQuestion.correctAnswer;

    this.quizHistory.update((history) => [
      ...history,
      {
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect,
      },
    ]);

    if (isCorrect) {
      this.score.update((value) => value + 1);
    }

    // Move to the next question after a short delay to show the selected answer
    setTimeout(() => {
      this.currentQuestionIndex.update((value) => value + 1);
      this.saveProgress(); // Save progress after moving to the next question
    }, 1000);
  }

  restartQuiz() {
    this.currentQuestionIndex.set(0);
    this.score.set(0);
    this.quizHistory.set([]);
    this.clearProgress();
  }

  loadProgress() {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('quizProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        // Apply your saved progress logic here
      }
    }
  }

  saveProgress() {
    // Only save to localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const progress = {
        // Your progress data
      };
      localStorage.setItem('quizProgress', JSON.stringify(progress));
    }
  }

  clearProgress() {
    localStorage.removeItem('quizProgress');
  }
}
