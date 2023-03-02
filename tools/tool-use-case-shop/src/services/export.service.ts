import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from "@angular/common";

export interface ReturnValue {
    name: string;
}

@Injectable()
export class ExportService {

    url: string = "";
    urlListener: BehaviorSubject<string> = new BehaviorSubject(this.url);

    constructor(private http: HttpClient, @Inject(APP_BASE_HREF) private baseHref: string) { }

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
            contractor2: "",
            contractor1: "",
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

    reset() {
        this.useCases = [];
        this.standards = [];
        this.authentications = [];
        this.transportConditions = [];
        this.processingConditions = [];
        this.archivingConditions = [];
        this.attributes = [];

        this.specification = {
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
    }

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
        var n = "CDS-M-" + name + '-' + new Date().getTime() + ".json";
        // FileSaver.saveAs(data, n);
 
        const formData: FormData = new FormData();
        formData.append("name", n);
        formData.append("data", json);

        let url = "/upload/";
        if (this.baseHref.indexOf('localhost') > 0 ){
            url = "http://localhost:4201/";
        }

        this.http.post<ReturnValue>(url, formData).subscribe(
            (r)=> {
                console.log('got r', r.name);
                this.urlListener.next(r.name);
            }
          )
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
        this.archivingConditions.forEach(t => {
            delete t.selected;
        });

        this.specification.archive = this.archivingConditions;
    }

    deleteTags() {
        this.useCases.forEach(u => { delete u.tags; });
    }

    applyProcessingConditions() {
        this.processingConditions.forEach(t => {
            delete t.selected;
            delete t.type;
        });

        this.specification.processing = this.processingConditions;
    }

    applyTransportConditions() {
        let toExport: any[] = [];
        this.transportConditions.forEach(t => {
            toExport.push({ "name": t.name, "encryption": t.encryption, "version": t.version });
        });

        this.specification.transport = toExport;
    }

    applyStandardsSelectionToUseCases() {
        let usedStandards: any[] = [];
        this.useCases.forEach((useCase: any) => {
            useCase.standards = useCase.standards.filter((x: any) => x.checked);
            useCase.standards.forEach((element: any) => { usedStandards.push(element.name); });
        });

        this.standards.forEach((s: any) => {
            if (usedStandards.includes(s.name)) {
                this.specification.standards.push(s);
            }
        });
        this.specification.useCases = this.useCases;
    }
}