import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from './topic.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  private title: string;
  protected questions: any;
  protected question: any;
  protected isCorrectAnswer: any = {};
  protected answerExplaination: any = {};
  protected isWrongAnswer: any = {};
  protected correctQuestion: boolean = false;
  protected isDisabled: boolean = false;
  protected noRecord: boolean = false;
  protected totalQuestions: number = 0;
  protected totalQuestionsAttempt: number = 0;
  protected totalQuestionsLeft: number = 0;
  protected totalQuestionsCorrect: number = 0;
  protected totalQuestionsWrong: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private topicService: TopicService,
    private tostr: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.title = params.get('title');
      this.getAllQuestions();
    });
    //this.title = this.activatedRoute.snapshot.paramMap.get("title");

  }

  getAllQuestions() {
    this.noRecord = false;
    this.questions = [];

    this.topicService.getQuestions(this.title)
      .subscribe(data => {
        this.questions = data.data;
        this.totalQuestions = this.questions.length;
        this.totalQuestionsLeft = this.totalQuestions;
        if (this.totalQuestions === 0) {
          console.log('no record');
          this.noRecord = true;
        }
        this.tostr.success(data.message);
        console.log('questions ==');
        console.log(data);

      }, err => {
        console.log('error ===>');
        console.log(err);
        this.noRecord = true;
        this.totalQuestions = this.questions.length;
        this.totalQuestionsLeft = this.totalQuestions;
        this.totalQuestionsWrong = 0;
        this.tostr.error(err.error.message);
      });
  }

  checkAnswer(evt: any) {
    let answerIsCorrect = false;
    const data = evt.target.value;
    const splited = data.split(',');
    const questionId = splited[0];
    const optionId = splited[1];
    this.isCorrectAnswer[questionId] = false;
    this.answerExplaination[questionId] = false;
    this.topicService.getQuestion(questionId)
      .subscribe(data => {
        this.question = data.data;
        for (let index = 0; index < this.question.options.length; index++) {
          const element = this.question.options[index];
          if (element.correct && optionId == element.id) {
            answerIsCorrect = true;
            this.totalQuestionsCorrect = this.totalQuestionsCorrect + 1;
          }
        }

        this.correctQuestion = true;
        this.isWrongAnswer[questionId] = !answerIsCorrect ? true : false;
        this.isCorrectAnswer[questionId] = answerIsCorrect ? true : false;
        this.totalQuestionsAttempt = this.totalQuestionsAttempt + 1;
        this.totalQuestionsLeft = this.totalQuestionsLeft - 1;
        this.totalQuestionsWrong = !answerIsCorrect ? this.totalQuestionsWrong + 1 : this.totalQuestionsWrong;
        this.answerExplaination[questionId] = this.question.answer_explanation != '' ? true : false;
      }, err => {
        console.log('error ===>');
        console.log(err);
        this.tostr.error(err.error.message);
      });
  }

}
