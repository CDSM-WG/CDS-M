import { Component, Input, OnInit } from "@angular/core";
import { UseCaseItem } from "../use-case-view/use-case-item";
import { UseCaseService } from "src/services/use-case.service";

import { FlatTreeControl } from '@angular/cdk/tree';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


class SelectionNode {
  name: string = '';
  parentName: string = '';
  tag: string = '';

  children?: SelectionNode[];

  setName(tag : string) {
    let t1:string = tag.split(':',1)[0];
    let t2:string = tag.split(':',2)[1];
    if ( t2 != null ) {
      this.name = t2;
      this.parentName = t1;
    }
    else {
      this.name = t1;
    }
    this.tag = tag;
  }
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
})
export class SelectionComponent implements OnInit {

  result: SelectionNode[] = [];

  checklistSelection = new SelectionModel<ExampleFlatNode>(true /* multiple */);

  private _transformer = (node: SelectionNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  service: UseCaseService;

  constructor(service : UseCaseService) {
    this.dataSource.data = this.result;
    this.service = service;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  @Input() useCases: UseCaseItem[] = [];

  ngOnInit(): void {    
    for( let i = 0; i < this.useCases.length; ++i ){
      let usecase=this.useCases[i];
      for( let t = 0; t < usecase.data.tags.length; ++t ){
        let tag = usecase.data.tags[t];
        let t1:string = tag.split(':',1)[0];
        //let t2:string = tag.split(':',2)[1];
        let available = this.result.filter( x => x.name == t1 );
        if ( available.length > 0 ){
          let found = false;
          for ( let j = 0; j < available[0].children!.length; ++j) {
            if (available[0].children![j].tag == tag ){
              found = true;
              break;
            }
          }
          if( !found ){
            let n = new SelectionNode();
            n.setName(tag);
            available[0].children!.push( n ) ;
          }
        }
        else {
          let n = new SelectionNode();
          n.setName(t1);

          let m = new SelectionNode();
          m.setName(tag);
          n.children = [m]; 
          this.result.push( n );
        }
      }
    }
    this.dataSource.data = this.result;
    this.treeControl.expandAll();
  }  

  todoLeafItemSelectionToggle(node: ExampleFlatNode): void {
    !this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(node)
      : this.checklistSelection.deselect(node);
      console.log(node.name);

      this.result.forEach( x => { 
        x.children!.forEach( y => {
          if(y.name == node.name) 
            if( this.checklistSelection.isSelected(node) )
              this.service.filterUseCases(y.tag);  
            else 
              this.service.resetfilterUseCases(y.tag);  
        } );       
      } );
      
  } 
}