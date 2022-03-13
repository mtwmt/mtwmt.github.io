import { Component, forwardRef, OnInit } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-default-form-control',
  templateUrl: './default-form-control.component.html',
  styleUrls: ['./default-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DefaultFormControlComponent),
    },
  ],
})
export class DefaultFormControlComponent implements ControlValueAccessor {
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
  });

  public onChange = (type: { id: number; name: string }) => type;
  public onTouched = () => {};
  public touched = false;
  public disabled = false;

  public writeValue(value: any) {
    this.form.patchValue({ ...value });
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
}
