import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromRoot from '../common/index';
import { Note } from '../common/notes/notes.model';
import * as notes from '../common/notes/notes.action';

@Component({
    selector: 'left-sidebar',
    templateUrl: 'left-sidebar.template.html',
    styleUrls: ['./sidebar.styles.css']
})
export class LeftSidebarComponent  {

    public allNotes$: Observable<any>;
    public allNotes: Array<any>;
    public searchText: string;
    public displayNotes: Array<any>;
    public notesSubscription: any;
    public selectedNote: Note;

    constructor(private store: Store<fromRoot.AppState>) {
        this.allNotes$ = this.store.select(fromRoot.getAllNotes);
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.notesSubscription = this.allNotes$.subscribe(res => {
            this.allNotes = res;
            this.displayNotes = res;
        });

        this.store.select(fromRoot.getSelectedNote)
            .subscribe( note => {
                this.selectedNote = note;
            });
    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.notesSubscription.unsubscribe();
    }

    selectNote(i: number, selectedNote: Note) {
        console.log('index: ',i);
        this.store.dispatch(new notes.SelectNoteAction(i, selectedNote));
    }

    searchNotes() {
        if (this.searchText === '') {
            this.displayNotes = this.allNotes;
        } else {
            this.displayNotes = this.allNotes.filter(note => 
                note.title.indexOf(this.searchText.toLowerCase()) !== -1 || note.noteContent.indexOf(this.searchText.toLowerCase()) !== -1);
        }
    }

}
