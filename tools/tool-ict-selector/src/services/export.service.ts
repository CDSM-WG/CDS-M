import { Injectable } from "@angular/core";
import * as FileSaver from 'file-saver'
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ExportService {
    
    signalExport = new BehaviorSubject<string>("");

    useCases: any[] = [];
    standards: any[] = [];
    authentications: any[] = [];
    transportConditions: any[] = [];
    processingConditions: any[] = [];
    archivingConditions: any[] = [];
    attributes: any[] = [];

    export() {
        this.applyStandardsSelectionToUseCases();
        this.applyTransportConditions();
        this.applyProcessingConditions();
        this.applyArchivingConditions();
        this.deleteTags();

        var json = JSON.stringify(this.useCases.filter( u => { 
            return u.standards.length > 0;
        })); 
        const data: Blob = new Blob([json], { type: "text/json" });
        FileSaver.saveAs(data, "CDS-M-ICT-" + new Date().getTime() + ".json");
    }

    private applyArchivingConditions() {
        this.archivingConditions.forEach( t => {
            delete t.selected;
        } ); 

        this.useCases.forEach( (useCase: any) => {
            useCase.archive = this.archivingConditions;
        })
    }

    deleteTags(){
        this.useCases.forEach( u => { delete u.tags; } );
    }

    applyProcessingConditions() {
        this.processingConditions.forEach( t => {
            delete t.selected;
            delete t.type;
        } );

        this.useCases.forEach( (useCase: any) => {
            useCase.processing = this.processingConditions;
        })
    }

    applyTransportConditions() {
        let toExport: any[] = [];
        this.transportConditions.forEach( t => {
            toExport.push( { "name": t.name, "encryption": t.encryption, "version": t.version } );
        } ); 

        this.useCases.forEach( (useCase: any) => {
            useCase.transport = toExport;
        })
    }

    applyStandardsSelectionToUseCases() {
        let selectedStandards = this.standards.filter( (s:any) => { return s['selected']; } );
        this.useCases.forEach( (useCase: any) => 
        {
            let gatheredStandards: any[] = []
            useCase.standards.forEach( (standard: any) => {
                selectedStandards.forEach( (selected: any) => {
                    if(selected.name === standard.name){
                        let aut: any[] = [];
                        standard['authentications'] = aut;
                        this.authentications.forEach( (a) => {
                            if (selected[a]) {
                                aut.push(a);
                            }
                        });

                        this.attributes.forEach( (a) => {
                            if (a in selected) {
                                standard[a] = selected[a];
                            }
                        });

                        gatheredStandards.push(standard);
                    }
                });
            });
            useCase.standards = gatheredStandards;
        });
    }
}