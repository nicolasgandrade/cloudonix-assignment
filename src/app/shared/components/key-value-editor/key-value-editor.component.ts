import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'ng-key-value-editor',
  templateUrl: './key-value-editor.component.html',
  styles: `
    .kv-group {
      display: flex;
      margin-bottom: 6px;
    }
  `,
  imports: [ReactiveFormsModule, NgFor],
})
export class KeyValueEditorComponent implements OnInit, OnDestroy {
  @Output() keyValuePairsChanged = new EventEmitter<Record<string, string>>();

  readonly dynamicForm = new FormGroup({
    pairs: new FormArray<
      FormGroup<{
        key: FormControl<string | null>;
        value: FormControl<string | null>;
      }>
    >([]),
  });

  private keysToDelete: string[] = [];

  private readonly onDestroy$ = new Subject<void>();

  @Input() set keyValuePairs(pairs: Record<string, string>) {
    this.setFormFromPairs(pairs);
  }

  ngOnInit(): void {
    this.listenToForm();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  addPair(): void {
    this.dynamicForm.controls.pairs.push(
      new FormGroup({ key: new FormControl(), value: new FormControl() }),
    );
  }

  removePair(index: number): void {
    const targetKey =
      this.dynamicForm.controls.pairs?.controls[index].getRawValue()?.key || '';

    this.keysToDelete.push(targetKey);
    this.dynamicForm.controls.pairs.removeAt(index);
  }

  private setFormFromPairs(pairs: Record<string, string>): void {
    const formPairs = Object.entries(pairs).map(
      ([key, value]) =>
        new FormGroup({
          key: new FormControl(key),
          value: new FormControl(value),
        }),
    );
    this.dynamicForm.setControl('pairs', new FormArray([...formPairs]));
    this.dynamicForm.controls.pairs.controls.forEach((control) =>
      control.controls.key.disable(),
    );
  }

  private listenToForm(): void {
    this.dynamicForm.valueChanges.subscribe(() => {
      const value = this.dynamicForm.getRawValue();
      if (!value?.pairs) {
        this.keyValuePairsChanged.emit({});
        return;
      }

      const record = Object.fromEntries(
        value.pairs
          .filter((pair) => !!pair.key)
          .map((pair) => [pair.key, pair.value]),
      );

      this.keysToDelete
        .filter((key) => !!key)
        .forEach((key) => {
          record[key] = null;
        });

      console.log(this.keysToDelete);
      console.log(record);

      this.keyValuePairsChanged.emit(record);
    });
  }
}
