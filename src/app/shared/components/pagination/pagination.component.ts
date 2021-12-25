import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Output() readonly onPageIndexChange: EventEmitter<number> =
    new EventEmitter();
  @Input() total = 0;
  @Input() pageIndex: number = 1;
  @Input() pageSize = 10;
  @Input() hideSinglePage = false;

  private onDestroy$ = new Subject();

  pageRangeItem: any = [];

  lastIndex!: number;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { pageIndex, pageSize, total } = changes;

    if (pageIndex || pageSize || total) {
      this.buildIndexes();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  /**
   * 共有幾頁，最後一頁頁碼
   */
  getLastIndex(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize);
  }

  /**
   * 建立頁碼索引
   */
  buildIndexes(): void {
    this.lastIndex = this.getLastIndex(this.total, this.pageSize);
    this.pageRangeItem = this.setPageItem(this.pageIndex, this.lastIndex);
  }

  setPageItem(startIndex: number, endIndex: number) {
    const concatWithPrevNext = (listOfPage: any[]) => {
      const prevItem = {
        type: 'prev',
        disabled: startIndex === 1,
      };
      const nextItem = {
        type: 'next',
        disabled: startIndex === endIndex,
      };

      return [prevItem, ...listOfPage, nextItem];
    };

    const generatePage = (start: number, end: number) => {
      const list = [];
      for (let i = start; i <= end; i++) {
        list.push({
          index: i,
          type: 'page',
        });
      }
      return list;
    };

    if (endIndex <= 9) {
      return concatWithPrevNext(generatePage(1, endIndex));
    } else {
      const generateRangeItem = (selected: number, last: number) => {
        let listOfRange = [];
        const prevFiveItem = {
          type: 'prev_5',
        };
        const nextFiveItem = {
          type: 'next_5',
        };
        const firstPageItem = generatePage(1, 1);
        const lastPageItem = generatePage(endIndex, endIndex);

        if (selected < 4) {
          listOfRange = [...generatePage(2, 5), nextFiveItem];
        } else if (selected < last - 3) {
          listOfRange = [
            prevFiveItem,
            ...generatePage(selected - 2, selected + 2),
            nextFiveItem,
          ];
        } else {
          listOfRange = [prevFiveItem, ...generatePage(last - 4, last - 1)];
        }
        return [...firstPageItem, ...listOfRange, ...lastPageItem];
      };
      return concatWithPrevNext(generateRangeItem(startIndex, endIndex));
    }
  }

  validatePageIndex(value: number, lastIndex: number): number {
    if (value > lastIndex) {
      return lastIndex;
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }

  onPageIndex(item: { index: number; type: string; disabled?: boolean }) {
    if (!item.disabled) {
      if (item.type === 'page') {
        this.setPageIndex(item.index);
      } else {
        const diff: any = {
          next: 1,
          prev: -1,
          prev_5: -5,
          next_5: 5,
        }[item.type!];
        this.setPageIndex(this.pageIndex + diff);
      }
    }
  }

  setPageIndex(index: number) {
    const lastIndex = this.getLastIndex(this.total, this.pageSize);
    const validIndex = this.validatePageIndex(index, lastIndex);
    this.onPageIndexChange.emit(validIndex);
  }
}
