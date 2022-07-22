import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseCaseService } from '../../services/use-case.service';
import { StandardService } from '../../services/standard.service';

@Component({
  selector: 'app-use-case-detail',
  templateUrl: './use-case-detail.component.html',
  styleUrls: ['./use-case-detail.component.css']
})
export class UseCaseDetailComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute, private useCaseService: UseCaseService, private standardService: StandardService) 
    { 
      
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe( p => {
      let id = p['id'];
      this.data = this.useCaseService.getUseCase( id );
    });
  }

  getStandard( name : string ) {
    return this.standardService.getStandard(name);
  }

  addToCart() {
    this.useCaseService.addToCart(this.data.id);
  }

  getClasses() {
    if (this.useCaseService.isInCart(this.data.id)) {
      return "removeFromCart";
    }
    return "addToCart";
  }

  getContent() {
    if (this.useCaseService.isInCart(this.data.id)) {
      return "-";
    }
    return "+";
  }
}
