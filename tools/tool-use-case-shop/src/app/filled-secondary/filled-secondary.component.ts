import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filled-secondary',
  templateUrl: './filled-secondary.component.html',
  styleUrls: ['./filled-secondary.component.css']
})
export class FilledSecondaryComponent implements OnInit {

  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
