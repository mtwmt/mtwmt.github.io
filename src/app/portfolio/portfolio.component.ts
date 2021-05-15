import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Work } from './portfolio.model';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @ViewChildren('timeline') timeline: QueryList<ElementRef>;
  @ViewChildren('items') items: QueryList<ElementRef>;

  baseUrl = environment.assetsUrl + '/portfolio';

  public st: number;
  public wh: number;

  year = [];
  year$: BehaviorSubject<ElementRef[]> = new BehaviorSubject([]);
  items$: BehaviorSubject<ElementRef[]> = new BehaviorSubject([]);

  list$: Observable<Work> = this.fetchPortfolio();

  @HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
    this.st = this.document.documentElement.scrollTop;
    this.wh = window.innerHeight;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.timeline.changes.subscribe(res => {
      this.year = res.toArray();
      // this.updateItems();
    });
  }

  // updateItems() {
  //   setTimeout(() => {
  //     // this.items = this.itemsElement.toArray();
  //     // console.log('asd',this.items)
  //     this.items$.next(this.itemsElement.toArray())
  //   });
  // }

  public onYear(idx:number): void {

    const yearTop = this.year[idx].nativeElement.offsetTop;

    window.scrollTo({ top: yearTop, behavior: 'smooth' });
  }

  fetchPortfolio(): Observable<Work> {
    return this.httpClient.get<any>(this.baseUrl + '/portfolio.json');
  }

}

