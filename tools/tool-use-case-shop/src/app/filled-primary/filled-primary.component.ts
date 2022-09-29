import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filled-primary',
  templateUrl: './filled-primary.component.html',
  styleUrls: ['./filled-primary.component.css']
})
export class FilledPrimaryComponent implements OnInit {

  @Input() title: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
