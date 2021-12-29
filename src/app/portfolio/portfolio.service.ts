import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { iif, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlatformService } from '../shared/services/platform.service';

export interface Work {
  year: number;
  portfolio: Portfolio[];
}

export interface Portfolio {
  title: string;
  image: string;
  link: string;
  device: string;
  description: string;
}

const _cachePortfolioKey = makeStateKey('portfolio.json');

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  readonly baseUrl = `${environment.baseUrl}/assets`;

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState,
    private platformService: PlatformService
  ) {}

  public portfolio$ = iif(
    () => !!this.transferState.get(_cachePortfolioKey, null),
    of(this.transferState.get(_cachePortfolioKey, null)!),
    this.httpClient.get<Work[]>(`${this.baseUrl}/portfolio.json`).pipe(
      tap((json: Work[]) => {
        if (this.platformService.isServer) {
          this.transferState.set<Work[]>(_cachePortfolioKey, json);
        }
      })
    )
  ).pipe(shareReplay(1));
}
