import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrl: './deletion-dialog.component.scss',
})
export class DeletionDialogComponent {
  readonly dialogRef = inject(DialogRef);
}
