import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('show') display!: boolean;
  @Output('selection') selection = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.selection.emit(false);
    this.display = false;
  }

  ok() {
    this.selection.emit(true);
    this.display = false;
  }
}
