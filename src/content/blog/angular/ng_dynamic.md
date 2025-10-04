---
title: Angular 動態載入組件
categories:
  - Angular
tags:
  - Angular
date: 2019/07/21
---

# 動態載入組件

情境：tab 切換

app.module.ts

```javascript
// ...略
import { TaskComponent } from './tab/task/task.component';
import { AnalysisComponent } from './tab/analysis/analysis.component';
import { SoundComponent } from './tab/sound/sound.component';

@NgModule({
  declarations: [
    // ...略
    TaskComponent,
    AnalysisComponent,
    SoundComponent,
  ],
  // 加入這串 將需被切換的組件放入
  entryComponents: [
    TaskComponent,
    AnalysisComponent,
    SoundComponent
  ],
})
export class AppModule { }

```

component.html

```html
<div class="tab">
  <div (click)="doCurrect('task')"></div>
  <div (click)="doCurrect('analysis')"></div>
  <div (click)="doCurrect('sound')"></div>
</div>
<div class="tab-cont">
  <!-- 要切換的地方 -->
  <ng-container *ngComponentOutlet="comps.get(currect)"></ng-container>
</div>
```

component.ts `新增預載入的component`

```javascript
// ...略
import { TaskComponent } from './task/task.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { SoundComponent } from './sound/sound.component';

currect = '';
comps = new Map<string, any>(
  [
    ['task', TaskComponent],
    ['analysis', AnalysisComponent],
    ['sound', SoundComponent],
  ]
);
doCurrect(el: string) {
  this.currect = el;
}
```

另一種做法可以使用 if else 來做
