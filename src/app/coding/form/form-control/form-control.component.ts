import { options } from './../form-data';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Combination } from '../form-data';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlComponent),
    },
  ],
})
export class FormControlComponent implements ControlValueAccessor {
  @Output() removeField: EventEmitter<number> = new EventEmitter();

  options = options;

  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    type: new FormControl(''),
    value: new FormControl({ value: '', disabled: true }),
  });

  public onChange = (combination: Combination) => combination;
  public onTouched = () => {};
  public touched = false;
  public disabled = false;

  public writeValue(combination: Combination) {
    this.form.patchValue({ ...combination });
  }

  public registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  public onInputChange() {
    this.markAsTouched();
    this.onChange(this.form.getRawValue());
  }

  public onTypeChange(): void {
    this.markAsTouched();
    this.onChange(this.form.getRawValue());
  }

  public onRemoveField(e?: MouseEvent): void {
    e?.preventDefault();
    this.markAsTouched();
    this.removeField.emit();
  }
}
