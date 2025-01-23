import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'edit-create-product-dialog',
  templateUrl: './edit-create-dialog.component.html',
  styleUrl: './edit-create-dialog.component.scss',
  imports: [ProductFormComponent],
})
export class EditCreateDialogComponent {
  readonly dialogRef = inject(DialogRef<Partial<Product>>);
  readonly data = inject(DIALOG_DATA);
}
