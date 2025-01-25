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
import { cloneDeep } from 'lodash';
import { Product } from '../../models/product.model';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  imports: [ReactiveFormsModule, IMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductFormComponent implements AfterViewInit {
  @Output() productSubmitted = new EventEmitter<Partial<Product>>();

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
  });

  initialKeyValueEditorValue: Record<string, string> = {};
  initialDefaultProfileEditorValue: Record<string, string> = {};
  private keyValueEditorValue: Record<string, string> = {};
  private defaultProfileEditorValue: Record<string, string> = {};

  ngAfterViewInit(): void {
    this.setupAndListenToKeyValueWebComponent();
    this.setupAndListenToProfileWebComponent();
  }

  @Input() set product(value: Partial<Product>) {
    if (!value) {
      return;
    }

    this.form.patchValue(value);
    this.form.controls.sku.disable();

    if (!!value.profile) {
      this.initialDefaultProfileEditorValue = cloneDeep(value.profile);

      delete value.profile['type'];
      delete value.profile['available'];
      delete value.profile['backlog'];
      this.initialKeyValueEditorValue = value.profile;
    }
  }

  onSubmit(): void {
    const updatedValue = {
      ...this.form.value,
      profile: {
        ...this.defaultProfileEditorValue,
        ...this.keyValueEditorValue,
      },
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

  private setupAndListenToProfileWebComponent() {
    const profileEditor = document.querySelector(
      'profile-editor',
    ) as HTMLElement;

    profileEditor?.addEventListener(
      'profileValueChange' as any,
      (event: CustomEvent) => {
        this.defaultProfileEditorValue = event.detail;
      },
    );
  }
}
