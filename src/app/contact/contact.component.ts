import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    tel: new FormControl(''),
    line: new FormControl(''),
    mail: new FormControl('', [Validators.email]),
    msg: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    const url =
      'https://script.google.com/macros/s/AKfycbwUiOQQbBvxPHzdzkvtb97NFmCZ9KKX9zr3RRmMkKnzI7VlE_LvhhaOrmTo5WqCMfdf/exec';
    const data = {
      name: this.form.get('name')?.value,
      tel: this.form.get('tel')?.value,
      line: this.form.get('line')?.value,
      mail: this.form.get('mail')?.value,
      msg: this.form.get('msg')?.value,
      time: new Date().toLocaleString('en', { hour12: false }),
    };

    this.http
      .get(url, {
        params: new HttpParams({
          fromObject: data,
        }),
      })
      .pipe(
        catchError((res: any) => {
          if (res.status === 200) {
            this.form.reset();
            alert('謝謝您的訊息，Mandy收到囉^_^');
          } else {
            alert('目前似乎有問題，請稍後再試');
          }
          return of(res);
        })
      )
      .subscribe();
  }
}
