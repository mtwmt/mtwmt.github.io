import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Combination, data, formData } from './form-data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    default: new FormControl(),
    combination: new FormArray([]),
  });

  public get combination() {
    return this.form.get('combination') as FormArray;
  }

  ngOnInit(): void {
    // 初始化 formArray 裡的 formControl，才能順利將裡面的值 reset
    data.combination?.map((d) => {
      return this.combination.push(this.createFormControl(d));
    }) || [];

    this.initForm(data);
    this.setCombination();
  }

  setCombination(): void {
    this.form.get('default')?.valueChanges.subscribe((res) => {
      const data = this.form.get('combination')?.value;
      const combinations = data.map((d: any) => {
        return {
          ...d,
          value: res.name,
        };
      });
      this.form.get('combination')?.setValue(combinations);
    });
  }

  private initForm(data: formData) {
    this.form.reset({
      default: {
        id: data.id,
        name: data.name,
      },
      combination: data.combination,
    });
  }

  onSubmit() {
    console.log(
      'onSubmit',
      this.form.get('combination')?.value,
      this.form.value
    );
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
    this.combination.push(fromGroup);
  }
}
