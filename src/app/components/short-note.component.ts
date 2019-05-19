import { Component, Input } from '@angular/core';

@Component({
    selector: 'short-note',
    templateUrl: 'short-note.template.html',
    styleUrls: ['./sidebar.styles.css'],
})

export class ShortNoteComponent {
    @Input() noteId: number;
    @Input() noteTitle: string;
    @Input() noteContent: string;

    constructor() {}
}