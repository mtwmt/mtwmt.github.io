import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-blog-donate',
  templateUrl: './blog-donate.component.html',
  styleUrls: ['./blog-donate.component.scss'],
})
export class BlogDonateComponent implements OnInit {

  qrCodePath: string;
  showQR: boolean;
  delay$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
  ) { }

  ngOnInit(): void {
  }


  public onQrcode(path): void {
    this.qrCodePath = path;
    this.showQR = true;
    this.delay$.next(true);
  }

  public onHideQrCode(): void {
    this.showQR = false;
    setTimeout(() => {
      this.delay$.next(false);
    }, 600);
  }
}
