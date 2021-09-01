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
  protected isCorrectAnswer: any = { };
  protected isWrongAnswer: any = { };
  protected correctQuestion: boolean = false;
  protected isDisabled: boolean = false;

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
    this.questions = [];
    console.log('title ==>');
    console.log(this.title);

    this.topicService.getQuestions(this.title)
      .subscribe(data => {
        this.questions = data.data;
        this.tostr.success(data.message);
        console.log('questions ==');
        console.log(data);

      }, err => {
        console.log('error ===>');
        console.log(err);
        this.tostr.error(err.error.message);
      });
  }

  checkAnswer(evt: any) {
    const data = evt.target.value;
    const splited = data.split(',');
    console.log(splited);
    const questionId = splited[0];
    const optionId = splited[1];
    this.isCorrectAnswer[questionId] = false;
    this.topicService.getQuestion(questionId)
      .subscribe(data => {
        this.question = data.data;
        for (let index = 0; index < this.question.options.length; index++) {
          const element = this.question.options[index];
          if (element.correct && optionId == element.id) {
            this.isCorrectAnswer[questionId] = true;
            console.log('correct ans');
            console.log(this.isCorrectAnswer);
            return;
          }
        }
        this.correctQuestion = true;
        this.isWrongAnswer[questionId] = true;
        this.isCorrectAnswer[questionId] = false;
      }, err => {
        console.log('error ===>');
        console.log(err);
        this.tostr.error(err.error.message);
      });
  }

}
