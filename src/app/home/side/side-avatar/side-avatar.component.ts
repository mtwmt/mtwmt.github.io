import {
  ApplicationRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-side-avatar',
  templateUrl: './side-avatar.component.html',
  styleUrls: ['./side-avatar.component.scss'],
})
export class SideAvatarComponent implements OnInit, OnChanges {
  protected destroy$ = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reload(hasUpdate: boolean) {
    if (!hasUpdate) {
      return;
    }
    window?.location?.reload();
  }
}
