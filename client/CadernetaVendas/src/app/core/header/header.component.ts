import { Component, OnInit, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private render: Renderer) { }

  ngOnInit() { }

  // mouseEnter(elemento: ElementRef) {
  //   this.render.setElementStyle(elemento, 'color', '#37c6f0');
  // }

  // mouseLeave(elemento: ElementRef) {
  //   this.render.setElementStyle(elemento, 'color', '#384158');
  // }
}
