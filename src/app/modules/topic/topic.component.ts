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
  protected isCorrectAnswer: boolean = false;
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
    this.isCorrectAnswer = false;
    console.log('event');
    console.log(evt.target);
    const data = evt.target.value;
    const splited = data.split(',');
    const questionId = splited[0];
    const optionId = splited[1];
    this.topicService.getQuestion(questionId)
      .subscribe(data => {
        this.question = data.data;
        console.log('question ==');
        console.log(this.question);
        for (let index = 0; index < this.question.options.length; index++) {
          const element = this.question.options[index];
          if (element.correct && optionId == element.id) {
            console.log('true');
            this.isCorrectAnswer = true;
          }
        }
      }, err => {
        console.log('error ===>');
        console.log(err);
        this.tostr.error(err.error.message);
      });
  }

}
