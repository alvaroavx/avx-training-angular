import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightCriticalOnline]'
})
export class HighlightCriticalOnlineDirective {

  constructor() { }

  @Input() appHighlightCriticalOnline = false;

  @HostBinding('style.fontWeight') fontWeight = 'normal';
  @HostBinding('style.backgroundColor') background = '';
  @HostBinding('style.opacity') opacity = '1';

  @HostListener('mouseenter') onEnter() {
    if(this.appHighlightCriticalOnline) {
      this.fontWeight = 'bold';
      this.background = 'red !important';
      this.opacity = '0.6';
    }
  }
  @HostListener('mouseleave') onLeave() {
    this.fontWeight = 'normal';
    this.background = '';
    this.opacity = '1';
  }
}
