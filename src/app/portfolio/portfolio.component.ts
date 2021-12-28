import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  readonly baseUrl = environment.assetsUrl + '/images/portfolio';
  constructor(public portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // this.portfolioService.portfolio$.subscribe(res => {
    //   console.log('res',res )
    // })
  }
}
