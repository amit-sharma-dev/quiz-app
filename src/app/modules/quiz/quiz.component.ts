import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  private allQuestions: any;
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  async getAllQuestions() {
    this.allQuestions = this.quizService.getAll();
  }
}
