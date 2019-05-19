import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { map, tap, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
/**
 * Import the root state in order to select parts of it.
 */
import * as fromRoot from './common/index';
/*
 * Import the layout actions to make dispatching from the component possible.
 */
import * as layout from './common/layout/layout.actions';
import * as notes from './common/notes/notes.action';

import { Note } from './common/notes/notes.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /*
   Add this to your AppComponent to listen for window resize events
   */
  host: {
    '(window:resize)': 'onWindowResize($event)'
  }
})

export class AppComponent implements OnInit {
  public alerts$: Observable<any>;
  public allNotes$: Observable<Note[]>;
  public allNotes: Array<Note>;
  public selectedNote: Note;
  public noteForm: FormGroup;
  public leftSidebarState: boolean;
  public selectedNoteIndex: number;

  constructor(private store: Store<fromRoot.AppState>) {
    this.allNotes$ = store.select(fromRoot.getAllNotes);
    this.noteForm = new FormGroup({
      title: new FormControl(),
      noteContent: new FormControl('', Validators.required)
    });
    this.store.select(fromRoot.getLayoutLeftSidenavState)
      .subscribe( state => this.leftSidebarState = state);
  }

  ngOnInit() {
    this.allNotes$
      .subscribe(res => this.allNotes = res);

    this.store.select(fromRoot.getSelectedNote)
      .subscribe( note => {
        if (note !== this.selectedNote ) {
          this.noteForm.setValue({
            title: note.title,
            noteContent: note.noteContent
          });
        }
        this.selectedNote = note;
    });

    this.store.select(fromRoot.getSelectedNoteIndex)
      .subscribe( index => this.selectedNoteIndex = index);
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }

  onWindowResize(event) {
    this.store.dispatch(new layout.ResizeWndowAction({width: event.target.innerWidth, height: event.target.innerHeight }));
  }

  addAlert(alert) {
    this.store.dispatch(new layout.AddAlertAction(alert));
  }

  onCloseAlert(alert: Object) {
   this.store.dispatch(new layout.RemoveAlertAction(alert));
  }

  toggleSidebar() {
    if (this.leftSidebarState === true ) {
      this.store.dispatch(new layout.CloseLeftSidenavAction());
    } else {
      this.store.dispatch(new layout.OpenLeftSidenavAction());
    }
  }

  onSubmit() {
    if (this.selectedNote.noteId === 0) {
      this.store.dispatch(new notes.SaveNoteAction(this.noteForm.value));
      console.log('Form submitted for Save:', this.noteForm.value);
    } else {
      const updatedNote = new Note();
      updatedNote.noteId = this.selectedNote.noteId;
      updatedNote.title = this.noteForm.controls['title'].value;
      updatedNote.noteContent = this.noteForm.controls['noteContent'].value;
      this.store.dispatch(new notes.UpdateNoteAction(updatedNote));
      console.log('Updated Note:', updatedNote);
    }
  }

  createNewNote() {
    this.store.dispatch(new notes.CreateNoteAction());
  }

  deleteNote() {
    if (this.selectedNoteIndex !== -1 ) {
      this.store.dispatch(new notes.DeleteNoteAction());
    }
  }


}
