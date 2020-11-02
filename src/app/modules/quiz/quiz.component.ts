import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  allQuestions: any;
  isDataAvailable: boolean = false;

  constructor(private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.quizService.getAll().subscribe(data => {
      this.allQuestions = data;
      console.log('questions ==');
      console.log(this.allQuestions);

    }, err => {
      console.log('error ===>');
      console.log(err);
    });
  }
}
