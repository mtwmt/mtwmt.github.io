---
title: 使用 Angular 做檔案編碼檢測 (detect-encoding)
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/30
---

## 來由

前一陣子，後端有個需求是在檔案上傳前，需要提前知道上傳的檔案編碼 是 UTF-8 或是 ascii 等，才能決定要不要將檔案放進資料庫，或是在這之前再做一次轉檔。

今天的內容跟 Angular 比較沒有關係，屬於套件分享，但因也是使用 Angular 實作，所以也就放進來了。

---

## 實作

```bash
npm i jschardet
```

template

```html
<div class="form-group">
  <label for="file">Choose File</label>
  <input type="file" id="file" (change)="fileChange($event)" />
</div>

<br />
Your Encoding：{{ encoding$ | async }}
```

.ts 檔

```ts
import { Component, VERSION } from '@angular/core';
import jschardet from 'jschardet';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileToUpload: File = null;
  encoding$ = new Subject();

  fileChange(event: any): void {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvResult = e.target.result.split(/\r|\n|\r\n/);
      const encoding = jschardet.detect(csvResult.toString()).encoding;

      this.encoding$.next(encoding);
    };
    reader.readAsBinaryString(file);
  }
}
```

---

範例：
[https://stackblitz.com/edit/angular-detect-encoding](https://stackblitz.com/edit/angular-detect-encoding)

參考資料：
[csv-encoding-detection-javascript](https://guillim.github.io/javascript/2020/08/28/csv-encoding-detection-javascript.html)

---

## 附錄

後來使用 node 寫成小工具

git：[https://github.com/mtwmt/detect-encoding](https://github.com/mtwmt/detect-encoding)
