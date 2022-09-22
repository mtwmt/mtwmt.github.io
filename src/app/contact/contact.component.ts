import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    tel: new UntypedFormControl(''),
    line: new UntypedFormControl(''),
    mail: new UntypedFormControl('', [Validators.email]),
    msg: new UntypedFormControl(''),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    const url =
      'https://script.google.com/macros/s/AKfycbyKd222L2JluG8S4A6SvmZsN1Jbd7fzp37-ziZvbiB5w_LKSI9i740RNhXXgaIPruc/exec';
    const data = {
      name: this.form.get('name')?.value,
      tel: this.form.get('tel')?.value,
      line: this.form.get('line')?.value,
      mail: this.form.get('mail')?.value,
      msg: this.form.get('msg')?.value,
    };

    this.http
      .get(url, {
        params: new HttpParams({
          fromObject: data,
        }),
      })
      .pipe(
        catchError((res) => {
          return of(res);
        })
      )
      .subscribe((res) => {
        this.form.reset();
        alert('謝謝您的訊息，Mandy收到囉^_^');
      });
  }
}
