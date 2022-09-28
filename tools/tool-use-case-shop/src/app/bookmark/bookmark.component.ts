import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input()
  grade: string= "";

  constructor() { }

  ngOnInit(): void {
  }

}
