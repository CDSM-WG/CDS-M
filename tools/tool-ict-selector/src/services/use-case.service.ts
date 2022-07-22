import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class UseCaseService {

    useCases = new BehaviorSubject<any>(null);
  
}