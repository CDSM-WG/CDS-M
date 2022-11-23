import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { PrepareSelectionComponent } from '../app/prepare-selection/prepare-selection.component';
import { Subject } from "rxjs";

@Injectable()
export class CloseGuardService implements CanDeactivate<PrepareSelectionComponent> {
    canDeactivate(
        component: PrepareSelectionComponent
    ) {
        console.log('deactivate');
        let subject = new Subject<boolean>();
        component.openDialog();
        subject = component.subject;
        return subject.asObservable();
    }
}