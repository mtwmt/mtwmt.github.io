import { Combination } from './../form-data';
import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormGroupComponent),
    },
  ],
})
export class FormGroupComponent implements ControlValueAccessor {
  public form: FormGroup = new FormGroup({
    combinations: new FormArray([]),
  });

  public get combinations() {
    return this.form.get('combinations') as FormArray;
  }

  public onChange = (combinations: Combination[]) => combinations;
  public onTouched = () => {};

  public touched = false;
  public disabled = false;

  writeValue(value: Combination[]) {
    console.log('writeValue', value);

    const combination = value?.map((d) => this.createFormControl(d)) || [];

    if (!this.combinations.length) {
      this.form = new FormGroup({
        combinations: new FormArray(combination),
      });
    } else {
      this.combinations.setValue(value);
      this.onChange(value);
    }

    // this.form = new FormGroup({
    //   combinations: new FormArray(combination),
    // });

  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public createFormControl(d?: Combination): FormControl {
    return new FormControl({
      id: d?.id,
      type: d?.type,
      value: d?.value,
    });
  }

  public onAddField(e?: MouseEvent): void {
    e?.preventDefault();
    const fromGroup = this.createFormControl();
    this.combinations.push(fromGroup);
  }

  public onRemoveField(i: number, e?: MouseEvent): void {
    e?.preventDefault();
    this.combinations.removeAt(i);
    if (this.combinations?.length === 0) {
      this.combinations.reset();
    }
    this.onChange(this.form.getRawValue().combinations);
  }

  onValueChange() {
    this.markAsTouched();
    this.onChange(this.form.getRawValue().combinations);
  }
}
