import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { Product } from '../../models/product.model';
import { ProductType } from '../../utils/product-form.utils';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  imports: [ReactiveFormsModule, IMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductFormComponent implements AfterViewInit {
  @Output() productSubmitted = new EventEmitter<Partial<Product>>();

  readonly productTypes = ProductType;
  readonly maskOptions = {
    mask: Number,
    min: 0,
    scale: 2,
    signed: false,
    thousandsSeparator: ',',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: '.',
  };

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

  initialKeyValueEditorValue: Record<string, string> = {};
  private keyValueEditorValue: Record<string, string> = {};

  ngAfterViewInit(): void {
    this.setupAndListenToKeyValueWebComponent();
  }

  @Input() set product(value: Partial<Product>) {
    if (!value) {
      return;
    }

    this.form.patchValue(value);
    this.form.controls.sku.disable();

    if (!!value.profile) {
      delete value.profile['type'];
      delete value.profile['available'];
      delete value.profile['backlog'];

      this.initialKeyValueEditorValue = value.profile;
    }
  }

  onSubmit(): void {
    const updatedValue = {
      ...this.form.value,
      profile: { ...this.form.value.profile, ...this.keyValueEditorValue },
    };
    this.productSubmitted.emit(updatedValue);
  }

  private setupAndListenToKeyValueWebComponent() {
    const keyValueEditor = document.querySelector(
      'key-value-editor',
    ) as HTMLElement;

    keyValueEditor?.addEventListener(
      'keyValuePairsChanged' as any,
      (event: CustomEvent) => {
        this.keyValueEditorValue = event.detail;
      },
    );
  }
}
