import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductType } from '../../../features/products/utils/product-form.utils';

type FormValueHelper = Partial<{
  type: ProductType;
  available: boolean;
  backlog: number | null;
}>;

@Component({
  selector: 'ng-profile-editor',
  templateUrl: './profile-editor.component.html',
  imports: [ReactiveFormsModule],
})
export class ProfileEditorComponent implements OnInit {
  @Output() profileValueChange = new EventEmitter<FormValueHelper>();

  profileForm = new FormGroup({
    type: new FormControl<ProductType>(ProductType.FURNITURE, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    available: new FormControl(true, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    backlog: new FormControl<number | null>(null, Validators.min(0)),
  });

  readonly productTypes = ProductType;

  ngOnInit(): void {
    this.listenToForm();
  }

  @Input() set profileValue(value: FormValueHelper) {
    console.log(value);
    this.profileForm.patchValue(value);
    this.profileValueChange.emit(this.profileForm.value);
  }

  private listenToForm(): void {
    this.profileForm.valueChanges.subscribe((value) =>
      this.profileValueChange.emit(value),
    );
  }
}
