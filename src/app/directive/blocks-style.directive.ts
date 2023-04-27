import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]', 
  host: {
    '(document: keyup)' : 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})


export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = false;

  @Output() renderComplete = new EventEmitter();
  

  private items: HTMLElement[];
  private index: number = 0;
  container: HTMLElement;

  public activeElementIndex: number;


  constructor(private el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.activeElementIndex = 0;

    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
          
        }
      }
    } else {
      console.log('Не передан селектор');
    }
    
    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }

  ngOnChanges(changes: SimpleChanges): void { }

  initKeyUp(ev: KeyboardEvent): void {

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if (ev.key === 'ArrowRight') {
      this.index++;
      if (this.items[this.index]) {
        const nextElement = (this.items[this.index] as HTMLElement);
        nextElement.setAttribute('style', 'border: 2px solid red');
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest'});
      } else {
        this.index = this.items.length;
      }
      
    } else if (ev.key === 'ArrowLeft') {
        this.index--;
        if(this.index < 0) {
          this.index = 0;
        }
        if (this.items[this.index]) {
          const prevElement = (this.items[this.index] as HTMLElement);
          prevElement.setAttribute('style', 'border: 2px solid red');
          prevElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }  
  }
     
    this.activeElementIndex = this.index;
  } 

  initStyle(index:number) {
    if (this.items[index]) {
      const element = this.items[index] as HTMLElement
      element.setAttribute('style', 'border: 2px solid red');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }
  
}
