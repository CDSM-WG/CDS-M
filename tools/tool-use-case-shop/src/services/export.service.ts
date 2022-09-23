import { Injectable } from "@angular/core";
import * as FileSaver from 'file-saver';
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

    export(name: string, grade: string) {
        this.applyStandardsSelectionToUseCases();
        this.applyTransportConditions();
        this.applyProcessingConditions();
        this.applyArchivingConditions();
        if (grade != "A") {
            this.applyAgreements();
            this.applyConditions();
        }
        this.deleteTags();

        var json = JSON.stringify(this.specification); 
        const data: Blob = new Blob([json], { type: "text/json" });
        FileSaver.saveAs(data, "CDS-M-" + name + '-' + new Date().getTime() + ".json");
    }

    private applyAgreements() {
        this.specification.agreements = [];
        this.specification.agreements.push("DPA");
        this.specification.agreements.push("DPIA");
    }

    private applyConditions() {
        this.specification.termsAndConditions = [];
        this.specification.termsAndConditions.push("BIO");
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
        let usedStandards: any[] = [];
        this.useCases.forEach( (useCase: any) => 
        {
            useCase.standards = useCase.standards.filter( (x:any) => x.checked );
            useCase.standards.forEach((element:any) => {  usedStandards.push (element.name); });
        });

        this.standards.forEach( (s: any) => 
        {                 
            if (usedStandards.includes(s.name)) { 
                this.specification.standards.push(s); 
            } 
        });
        this.specification.useCases = this.useCases;
    }
}