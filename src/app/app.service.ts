import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  theme$ = new ReplaySubject<string>(1);
  toggleHamburger$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}
}
