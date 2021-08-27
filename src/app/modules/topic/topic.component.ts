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
  protected isCorrectAnswer: boolean = false;

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
    console.log('event');
    console.log(evt.target.value);
  }

}
