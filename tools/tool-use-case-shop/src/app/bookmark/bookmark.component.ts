import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input()
  grade: string = "";

  @Input()
  isAbsolute: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    
  }

}
