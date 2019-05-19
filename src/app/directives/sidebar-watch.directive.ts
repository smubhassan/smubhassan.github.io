import {Directive, ElementRef, Renderer, OnInit, AfterViewInit, AfterViewChecked} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../common/index';
let $ = require('jquery');

@Directive({selector: '[sidebarWatch]'})

export class SidebarWatchDirective implements OnInit{
  constructor(private el: ElementRef, private _store: Store<fromRoot.AppState>) {}

  /*
   Doing the checks on ngOnInit makes sure the DOM is fully loaded and the
   elements are available to be selected
   */
  ngOnInit() {
    /*
     Watch for the left sidebar state
     */
    this._store.select(fromRoot.getLayoutLeftSidenavState).subscribe((state) => {
      if (this.el.nativeElement.className === 'left-sidebar' && window.innerWidth > 768) {
        if (state) {
          $('#main-content').css('margin-left', '25%');
          $('#main-content').css('transition', 'margin 1s');
          $(this.el.nativeElement).css('width', '25%');
          $(this.el.nativeElement).css('margin-left', '0');
        } else {
          $('#main-content').css('margin-left', '0');
          $(this.el.nativeElement).css('width', '0');
          $(this.el.nativeElement).css('margin-left', '-100px');
        }
      } else if (this.el.nativeElement.className === 'left-sidebar' && window.innerWidth < 768) {
        if (state) {
          $('#main-content').css('margin-left', '60%');
          $('#main-content').css('transition', 'margin 1s');
          $(this.el.nativeElement).css('width', '60%');
          $(this.el.nativeElement).css('margin-left', '0');
        } else {
          $('#main-content').css('margin-left', '0');
          $(this.el.nativeElement).css('width', '0');
          $(this.el.nativeElement).css('margin-left', '-100px');
        }
      }
    });
  }

}
