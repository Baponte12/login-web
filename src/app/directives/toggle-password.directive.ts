import { Directive, ElementRef, Input } from '@angular/core';

@Directive( {
  selector: '[togglePassword]'
} )
export class TogglePasswordDirective {

  @Input() hasLabel: boolean;
  private _shown = false;

  constructor( private el: ElementRef ) {
    const parent = this.el.nativeElement.parentNode;
    const icon = document.createElement( 'img' ) as HTMLImageElement;
    icon.src = './assets/images/svg/view.svg';
    icon.setAttribute( 'style', 'position: absolute; right: 15px; top: 35%; cursor: pointer; z-index: 3' );
    icon.addEventListener( 'click', () => {
      this.toggle( icon );
    } );


    setTimeout( () => {
      if ( this.hasLabel ) {
        parent.insertBefore( icon, parent.childNodes[ 0 ] );
      } else {
        parent.appendChild( icon );
      }
    }, 250 );

  }

  toggle( icon: HTMLImageElement ) {
    this._shown = !this._shown;
    if ( this._shown ) {
      this.el.nativeElement.setAttribute( 'type', 'text' );
      icon.src = './assets/images/svg/view-active.svg';
    } else {
      this.el.nativeElement.setAttribute( 'type', 'password' );
      icon.src = './assets/images/svg/view.svg';
    }
  }
}
