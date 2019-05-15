import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cv-empty-message',
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.css']
})
export class EmptyMessageComponent implements OnInit {
  
  @Input() titulo : string = '';
  @Input() corpo: string = '';

  constructor() { }

  ngOnInit() {
  }

}
