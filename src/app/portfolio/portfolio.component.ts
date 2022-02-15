import { debounceTime, filter } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortfolioService } from './portfolio.service';
import { fromEvent } from 'rxjs';

const scrollTo = (top: number, element: HTMLElement) => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion)');
  element.scroll({
    behavior: motionQuery.matches ? 'auto' : 'smooth',
    top: top,
  });
};
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  readonly baseUrl = environment.assetsUrl + '/images/portfolio';

  @ViewChildren('items') items!: QueryList<ElementRef>;

  constructor(public portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // fromEvent(document, 'scroll')
    //   .pipe(debounceTime(250))
    //   .subscribe((res: any) => {
    //     console.log('scrollTop', res.target.documentElement.scrollTop);
    //   });
  }

  public onYear(idx: number): void {
    const elementTop =
      this.items.find((e, i) => i === idx)?.nativeElement.offsetTop - 80;

    window.scrollTo({ top: elementTop, behavior: 'smooth' });
  }
}
