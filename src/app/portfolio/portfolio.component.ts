import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(public portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // this.portfolioService.portfolio$.subscribe(res => {
    //   console.log('res',res )
    // })
  }
}
