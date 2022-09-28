import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-outline-primary',
  templateUrl: './outline-primary.component.html',
  styleUrls: ['./outline-primary.component.css']
})
export class OutlinePrimaryComponent implements OnInit {

  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
