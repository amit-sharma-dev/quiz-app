import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from './topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  title: string;
  questions: any;

  constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.paramMap.get("title");
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.topicService.getQuestions(this.title).subscribe(data => {
      this.questions = data;
      console.log('questions ==');
      console.log(this.questions);

    }, err => {
      console.log('error ===>');
      console.log(err);
    });
  }

}
