import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import {metaReducer} from './common/index';
import {SidebarWatchDirective} from './directives/sidebar-watch.directive';
import {LeftSidebarComponent} from './components/left-sidebar.component';
import {EffectsModule} from '@ngrx/effects';
import {AlertsListComponent} from './components/alerts-list.component';
import {ShortNoteComponent} from './components/short-note.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarWatchDirective,
    LeftSidebarComponent,
    AlertsListComponent,
    ShortNoteComponent
  ],
  imports: [
    NgbModule.forRoot(),
    JsonpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    /*
      Provide the application reducer to the store.
     */
    StoreModule.provideStore(metaReducer),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
