---
title: 初探 Typescript
categories:
  - typescript
tags:
  - JavaScript
  - typescript
date: 2019/05/01
---

## interface 定義型別( 規格 )

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return person.firstName + '' + person.lastName;
}
```

繼承

```ts
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}

function greeter(person: Person) {
  return person.firstName + '' + person.lastName;
}
```

## class 定義類

`property` 預設都是 pubilc，若不想外外部存取的話 要加上 `private`

```ts
class Student{
  name: string;
  age: number;
  prtvate birth: Date;
}

var student = new Student();
```

屬性宣告為 static 在使用時，不需要實體化就能呼叫

```ts
class Student {
  static type: string;
}

Student.type;
```

給屬性預設值

```ts
class Student {
  type: string = 'student';
}
```

constructor 建構式

```ts
class Student {
  name: string;
  age: number
  constructor( name: string , age: number) {
    this.name = name;
    this.age = age;
  }
}

// 速寫語法
class Student {
  constructor( public name: string, punlic age: number ){}
}

var student = new Student( 'mandy', 18 );
console.log( `Student name: ${ student.name }`, age: ${ student.age } )

```

---

## function

在 typescript 中 函式呼叫 `傳遞的參數` 必須與 `函數的參數` 數量一致，否則會報錯

解決方式：
必須要在參數名稱使用 `?` 標示此參數為 optional
或是指定預設值

需注意的是 `選擇性參數` 或 `有預設值的參數` 都必需放在 function 的尾端

```ts
function name(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + '' + lastName;
  } else {
    return firstName;
  }
}
// or
function name(firstName: string, lastName: string = '') {
  if (lastName) {
    return firstName + '' + lastName;
  } else {
    return firstName;
  }
}

var result1 = name('mandy', 'wang');
var result2 = name('mandy');
```

略略的記錄到這邊 coming soon...

---

更多的參考文件...
[https://github.com/kkbruce/TypeScript/blob/master/doc/zh-tw/Handbook.md#3.1](https://github.com/kkbruce/TypeScript/blob/master/doc/zh-tw/Handbook.md#3.1)
[https://www.tslang.cn/index.html](https://www.tslang.cn/index.html)
