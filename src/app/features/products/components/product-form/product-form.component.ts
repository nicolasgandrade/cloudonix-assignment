import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductType } from '../../utils/product-form.utils';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class ProductFormComponent {
  @Input() product?: Product;

  @Output() productSubmitted = new EventEmitter<Partial<Product>>();

  readonly productTypes = ProductType;

  readonly form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cost: new FormControl(0.0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    sku: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    profile: new FormGroup({
      type: new FormControl<ProductType>(ProductType.FURNITURE, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      available: new FormControl(true, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      backlog: new FormControl<number | null>(null, Validators.min(0)),
    }),
  });

  onSubmit(): void {
    this.productSubmitted.emit(this.form.value);
  }
}
