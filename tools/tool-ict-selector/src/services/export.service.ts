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

    specification: any = {            
        metaData: {
          versionNumber: 1,
          contractor1: "",
          contractor2: "",
          role1: "BOTH",
          role2: "BOTH"
        },
        useCases: [],
        standards: [],
        contractParts: [],
        termsAndConditions: [],
        transport: [],
        processing: [],
        archive: []
      };

    export() {
        this.applyStandardsSelectionToUseCases();
        this.applyTransportConditions();
        this.applyProcessingConditions();
        this.applyArchivingConditions();
        this.deleteTags();

        var json = JSON.stringify(this.specification); 
        const data: Blob = new Blob([json], { type: "text/json" });
        FileSaver.saveAs(data, "CDS-M-ICT-" + new Date().getTime() + ".json");
    }

    private applyArchivingConditions() {
        this.archivingConditions.forEach( t => {
            delete t.selected;
        } ); 

        this.specification.archive = this.archivingConditions;
    }

    deleteTags(){
        this.useCases.forEach( u => { delete u.tags; } );
    }

    applyProcessingConditions() {
        this.processingConditions.forEach( t => {
            delete t.selected;
            delete t.type;
        } );

        this.specification.processing = this.processingConditions;
    }

    applyTransportConditions() {
        let toExport: any[] = [];
        this.transportConditions.forEach( t => {
            toExport.push( { "name": t.name, "encryption": t.encryption, "version": t.version } );
        } ); 

        this.specification.transport = toExport;
    }

    applyStandardsSelectionToUseCases() {
        let selectedStandards = this.standards.filter( (s:any) => { return s['selected']; } );
        let gatheredStandards: any[] = []
        this.useCases.forEach( (useCase: any) => 
        {
            let names: any[] = [];
            useCase.standards.forEach( (standard: any) => {
                selectedStandards.forEach( (selected: any) => {
                    if(selected.name === standard.name){
                        names.push(selected.name);
                        if (this.standardNotRegistered(gatheredStandards, selected) ){                        
                            this.gatherStandard(standard, selected, gatheredStandards);
                        }
                    }
                });
            });
            useCase.standards = names;
        });
        this.specification.standards = gatheredStandards;
    }

    private gatherStandard(standard: any, selected: any, gatheredStandards: any[]) {
        let aut: any[] = [];
        standard['authentications'] = aut;
        this.authentications.forEach((a) => {
            if (selected[a]) {
                aut.push(a);
            }
        });

        this.attributes.forEach((a) => {
            if (a in selected) {
                standard[a] = selected[a];
            }
        });

        gatheredStandards.push(standard);
    }

    private standardNotRegistered(gatheredStandards: any[], selected: any) {
        return gatheredStandards.findIndex((g) => { return g.name === selected.name; }) == -1;
    }
}