import { Component, Input, OnInit } from '@angular/core';
import { UseCaseService } from '../../services/use-case.service';

@Component({
  selector: 'use-case-tile',
  templateUrl: './use-case-tile.component.html',
  styleUrls: ['./use-case-tile.component.css'],
  host: {'class': 'hexagon'}
})
export class UseCaseTileComponent implements OnInit {

  @Input()
  data: any;

  letters = '0123456789ABCDEF';
  color = '#000000';

  checked = false;

  @Input()
  selectable: boolean = false;

  constructor( private service: UseCaseService ) {}

  getOpacity() {
    if (this.selectable || this.checked)
      return 1; 
    return 0.5;
  }

  ngOnInit(): void {
    this.getRandomColor();
  }

  getTooltip() {
    return "As a " + this.data.story.asA + "\nI would like to " 
    + this.data.story.iWouldLikeTo + "\nin order to " + 
      this.data.story.inOrderTo;
  }

  getRandomColor() {
    this.color = '#';
    for (var i = 0; i < 6; i++) {
        this.color += this.letters[Math.floor(Math.random() * 16)];
    }
  }

  onChange(event: Event) {

    let cb = (event.target as any)
    console.log(cb.checked);
    if ( cb.checked )
    {
      this.service.selectUseCase(this.data);
    }
    else
    {
      this.service.deselectUseCase(this.data);
    }
  }
}
