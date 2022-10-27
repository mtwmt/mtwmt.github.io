import { combineLatest, map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IronmanListInfo, IronmanService } from './ironman.service';

@Component({
  selector: 'app-ironman',
  templateUrl: './ironman.component.html',
  styleUrls: ['./ironman.component.scss'],
})
export class IronmanComponent implements OnInit {
  // yearList = [
  //   'History',
  //   '2014',
  //   '2015',
  //   '2016',
  //   '2017',
  //   '2018',
  //   '2019',
  //   '2020',
  //   '2021',
  //   '2022',
  // ];

  // ironmanHistoryList$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetchHistoryIronman();
  // ironman2014List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2014Ironman();
  // ironman2015List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2015Ironman();
  // ironman2016List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2016Ironman();
  // ironman2017List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2017Ironman();
  // ironman2018List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2018Ironman();
  // ironman2019List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2019Ironman();
  // ironman2020List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2020Ironman();
  // ironman2021List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2021Ironman();
  // ironman2022List$: Observable<IronmanListInfo[]> =
  //   this.ironmanService.fetch2022Ironman();

  allList$!: Observable<any>
  constructor(public ironmanService: IronmanService) {}

  ngOnInit(): void {
    this.allList$ = combineLatest([
      this.ironmanService.fetchHistoryIronman(),
      this.ironmanService.fetch2014Ironman(),
      this.ironmanService.fetch2015Ironman(),
      this.ironmanService.fetch2016Ironman(),
      this.ironmanService.fetch2017Ironman(),
      this.ironmanService.fetch2018Ironman(),
      this.ironmanService.fetch2019Ironman(),
      this.ironmanService.fetch2020Ironman(),
      this.ironmanService.fetch2021Ironman(),
      this.ironmanService.fetch2022Ironman(),
    ])
      .pipe(
        map(
          ([
            history,
            list2014,
            list2015,
            list2016,
            list2017,
            list2018,
            list2019,
            list2020,
            list2021,
            list2022,
            ,
          ]) => {
            return {
              history,
              2014: list2014,
              2015: list2015,
              2016: list2016,
              2017: list2017,
              2018: list2018,
              2019: list2019,
              2020: list2020,
              2021: list2021,
              2022: list2022,
            };
          }
        )
      )
      // .subscribe((res) => {
      //   console.log(res);
      // });
  }
}
