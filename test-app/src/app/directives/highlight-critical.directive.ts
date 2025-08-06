import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightCritical]'
})
export class HighlightCriticalDirective {
  constructor() { }
  @Input() appHighlightCritical = false;
  
  @HostBinding('style.fontWeight') fontWeight = 'normal';
  @HostBinding('style.backgroundColor') background = '';

  @HostListener('mouseenter') onEnter() {
    if (this.appHighlightCritical) {
      this.fontWeight = 'bold';
      this.background = 'red !important';
    }
  }
  @HostListener('mouseleave') onLeave() {
    this.fontWeight = 'normal';
    this.background = '';

  }
    
}

