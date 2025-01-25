import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Product } from '../../models/product.model';

@Component({
  selector: 'details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss',
  imports: [CurrencyPipe, KeyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsDialogComponent {
  data = inject<Product>(DIALOG_DATA);
  dialogRef = inject(DialogRef);

  get dynamicFields() {
    const profile = cloneDeep(this.data?.profile);
    if (!profile) {
      return {};
    }

    return profile;
  }
}
