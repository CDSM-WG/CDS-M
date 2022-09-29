import {
    ElementRef,
    AfterViewInit,
    Directive,
    Host,
    Optional,
    Renderer2,
    Self,
    ViewContainerRef,
    Input
  } from "@angular/core";
  import { MatPaginator } from "@angular/material/paginator";
  
  @Directive({
    selector: "[style-paginator]"
  })
  export class StylePaginatorDirective {
    private _currentPage = 1;
    private _pageGapTxt = "...";
    private _rangeStart = 0;
    private _rangeEnd = 0;
    private _buttons: any[] = [];
  
  @Input()
  
    get showTotalPages(): number { return this._showTotalPages; }
    set showTotalPages(value: number) {
      this._showTotalPages = value % 2 == 0 ? value + 1 : value;
    }
    private _showTotalPages = 2;
  
    constructor(
      @Host() @Self() @Optional() private readonly matPag: MatPaginator,
      private vr: ViewContainerRef,
      private ren: Renderer2
    ) {
      //Sub to rerender buttons when next page and last page is used
      this.matPag.page.subscribe((v)=>{
        this.switchPage(v.pageIndex);
      })
    }
  
    private buildPageNumbers() {
      const actionContainer = this.vr.element.nativeElement.querySelector(
        "div.mat-paginator-range-actions"
      );
      const nextPageNode = this.vr.element.nativeElement.querySelector(
        "button.mat-paginator-navigation-next"
      );
      const prevButtonCount = this._buttons.length;

      // remove buttons before creating new ones
      if (this._buttons.length > 0) {
        this._buttons.forEach(button => {
          this.ren.removeChild(actionContainer, button);
        });
        //Empty state array
        this._buttons.length = 0;
      }
  
      //initialize next page and last page buttons
      if (this._buttons.length == 0) {
        let nodeArray = this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[2].childNodes;

        this.ren.addClass(this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[2], "gap-2");

        setTimeout(() => {
          for (let i = 0; i < nodeArray.length; i++) {
            if (nodeArray[i].nodeName === "BUTTON") {
                this.ren.removeClass(nodeArray[i], "mat-focus-indicator");
                this.ren.removeClass(nodeArray[i], "mat-tooltip-trigger");
                this.ren.removeClass(nodeArray[i], "mat-paginator-navigation-first");
                this.ren.removeClass(nodeArray[i], "mat-paginator-navigation-last");
                this.ren.removeClass(nodeArray[i], "mat-icon-button");
                this.ren.removeClass(nodeArray[i], "mat-button-base");

                this.ren.addClass(nodeArray[i], "text-white");
                this.ren.addClass(nodeArray[i], "bg-black");
                this.ren.addClass(nodeArray[i], "w-10");
                this.ren.addClass(nodeArray[i], "h-10");
                this.ren.addClass(nodeArray[i], "inline-flex");
                this.ren.addClass(nodeArray[i], "items-center");
                this.ren.addClass(nodeArray[i], "justify-center");
                this.ren.addClass(nodeArray[i], "cursor-pointer");
                this.ren.addClass(nodeArray[i], "font-medium");
            }
          }
        });
      }
  
      let dots = false;
  
      for (let i = 0; i < this.matPag.getNumberOfPages(); i = i + 1) {
        // if (
        //   (i < this._showTotalPages && this._currentPage < this._showTotalPages && i > this._rangeStart) ||
        //   (i >= this._rangeStart && i <= this._rangeEnd)
        // ) {
          this.ren.insertBefore(
            actionContainer,
            this.createButton(i, this.matPag.pageIndex),
            nextPageNode
          );
        // } else {
        //   if (i > this._rangeEnd && !dots) {
        //     this.ren.insertBefore(
        //       actionContainer,
        //       this.createButton(this._pageGapTxt, this.matPag.pageIndex),
        //       nextPageNode
        //     );
        //     dots = true;
        //   }
        // }
      }
    }
  
    private createButton(i: any, pageIndex: number): any {
      const linkBtn = this.ren.createElement("mat-button-" + i);
      const pagingTxt = isNaN(i) ? this._pageGapTxt : +(i + 1);
      const text = this.ren.createText(pagingTxt + "");
  
      switch (i) {
        case pageIndex:
          this.ren.setAttribute(linkBtn, "disabled", "disabled");
          this.ren.addClass(linkBtn, "text-white");
          this.ren.addClass(linkBtn, "bg-blue-500");
          this.ren.addClass(linkBtn, "w-10");
          this.ren.addClass(linkBtn, "h-10");
          this.ren.addClass(linkBtn, "inline-flex");
          this.ren.addClass(linkBtn, "items-center");
          this.ren.addClass(linkBtn, "justify-center");
          this.ren.addClass(linkBtn, "cursor-pointer");
          this.ren.addClass(linkBtn, "font-medium");
          break;
        case this._pageGapTxt:
          this.ren.listen(linkBtn, "click", () => {
            this.switchPage(this._currentPage + this._showTotalPages);
          });
          break;
        default:
          this.ren.listen(linkBtn, "click", () => {
            let prev = this.matPag.pageIndex;
            this.switchPage(i);
            let a: any = this.matPag;
            a._emitPageEvent(prev);      
          });
          this.ren.addClass(linkBtn, "bg-white");
          this.ren.addClass(linkBtn, "w-10"); 
          this.ren.addClass(linkBtn, "h-10"); 
          this.ren.addClass(linkBtn, "inline-flex"); 
          this.ren.addClass(linkBtn, "items-center"); 
          this.ren.addClass(linkBtn, "justify-center"); 
          this.ren.addClass(linkBtn, "cursor-pointer");
          this.ren.addClass(linkBtn, "font-medium");
          this.ren.addClass(linkBtn, "text-black");
          this.ren.addClass(linkBtn, "px-2");
          break;
      }
  
      this.ren.appendChild(linkBtn, text);
      //Add button to private array for state
      this._buttons.push(linkBtn);

      return linkBtn;
    }
  
    private initPageRange(): void {
      this._rangeStart = this._currentPage - this._showTotalPages / 2;
      this._rangeEnd = this._currentPage + this._showTotalPages / 2;
  
      this.buildPageNumbers();
    }
  
    private switchPage(i: number): void {
      this._currentPage = i;
      this.matPag.pageIndex = i;
      this.initPageRange();
    }
  
    public ngAfterViewInit() {
      this.initPageRange();
    }
  }
  