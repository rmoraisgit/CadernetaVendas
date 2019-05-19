import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[cvChangeColorOnHover]'
})
export class ChangeColorOnHoverDirective {

    constructor(private el: ElementRef,
                private render: Renderer) { }

    @HostListener('mouseover')
    changeColorOn() {
        this.render.setElementStyle(this.el.nativeElement, 'color', '#37c6f0');
    }

    @HostListener('mouseleave')
    changeColorOff() {
        this.render.setElementStyle(this.el.nativeElement, 'color', '#384158');
    }
}