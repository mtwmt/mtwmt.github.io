---
title: Angular Pipe (管道)
categories:
  - Angular
tags:
  - Angular
date: 2020/05/03
---

在 Angular 裡用來做一個簡單的數據轉換

這次做的是數值對應 ASCII Table
[對照表](https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html)

在 terminal 裡鍵入

```bash
ng g pipe my-new-pipe
或
ng g p my-new-pipe
```

建立一個新的 pipe

---

pipe.ts

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromCharCode', //pipe 轉換使用名稱
})
export class FromCharCodePipe implements PipeTransform {
  transform(value: any, args: any): any {
    return String.fromCharCode(+value + args);
  }
}
```

在 module.ts 引入

```js
import { FromCharCodePipe } from './pipe/from-char-code/from-char-code.pipe';

@NgModule({
    declarations: [FromCharCodePipe], //聲明這個Module的內部成員
    exports: [FromCharCodePipe]  // 用來控制將哪些內部成員暴露給外部使用 若沒 exports, 在 template 上使用會出錯
})
```

---

html

```html
<!-- 引入 pipe function 值 對照 -->
<div>{{ value | fromCharCode: args }}</div>
```

ts

```js
import { FromCharCodePipe } from '../../pipe/from-char-code/from-char-code.pipe';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers: [FromCharCodePipe],
})

export class AppComponent implements OnInit {
    constructor(
        private fromCharCodePipe.: FromCharCodePipe
    ){}
    ngOnInit() {
      // 在 ts 裡的使用方式
      this.fromCharCodePipe.transform( value, 'args' )
    }
}
```
