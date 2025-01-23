import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss',
  imports: [CurrencyPipe, JsonPipe],
})
export class DetailsDialogComponent {
  data = inject<Product>(DIALOG_DATA);
  dialogRef = inject(DialogRef);
}
