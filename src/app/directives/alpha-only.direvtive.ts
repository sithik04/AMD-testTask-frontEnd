import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[alphaOnly]'
})
export class AlphaOnlyDirective {

  constructor() { }

  regexStr = '^[a-zA-Z. ]*$';
  @Input() alphaOnly: boolean  = false;

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    if(this.alphaOnly){
      return new RegExp(this.regexStr).test(event.key);
    }
  }

}
