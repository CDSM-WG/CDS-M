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
  hexColor = '#000000';

  checked = false;

  @Input()
  selectable: boolean = false;

  constructor( private service: UseCaseService ) {}

  getOpacity() {
    if (this.selectable || this.checked)
      return 1; 
    return 0.2;
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
    //var c = '#';
    var colors = ['#B0E0E6','#ADD8E6','#87CEFA','#87CEEB','#00BFFF','#1E90FF','#6495ED','#4682B4','#5F9EA0','#4169E1','#0000FF',
      '#0000CD','#00008B','#000080'];
    var index = Math.floor(Math.random() * colors.length);

    /*for (var i = 0; i < 6; i++) {
        c += this.letters[Math.floor(Math.random() * 16)];
    }*/

    var o = this.getOpacity();
    this.hexColor = colors[index];
    this.color = this.hexToRgbA(this.hexColor, o);    
  }

  hexToRgbA(hex: string, o: number){
    var c: any;
    c= hex.substring(1).split('');
    if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+o+')';
  }

  getColor() {
    var o = this.getOpacity();
    this.color = this.hexToRgbA(this.hexColor, o);   
    return this.color;
  }

  getText() {
    var re = new RegExp('-', 'g');
    return (this.data.id as string).replace(re, '\n');
  }

  onChange(event: Event) {
    let cb = (event.target as any)
    console.log(cb.checked);
    this.checked = cb.checked;
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
