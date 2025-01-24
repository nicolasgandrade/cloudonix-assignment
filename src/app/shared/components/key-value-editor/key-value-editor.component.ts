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
    this.dynamicForm.controls.pairs.removeAt(index);
    console.log(this.dynamicForm.controls.pairs);
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
  }

  private listenToForm(): void {
    this.dynamicForm.valueChanges.subscribe((value) => {
      if (!value?.pairs) {
        this.keyValuePairsChanged.emit({});
        return;
      }

      const record = Object.fromEntries(
        value.pairs
          .filter((pair) => !!pair.key)
          .map((pair) => [pair.key, pair.value]),
      );

      this.keyValuePairsChanged.emit(record);
    });
  }
}
