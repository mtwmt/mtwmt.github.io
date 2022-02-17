---
layout: js
title: 利用 google.maps.LatLngBounds 讓googlemap自動縮放到適合的大小
categories:
  - JavaScript
tags:
  - JavaScript
  - Google
date: 2019/01/14
---

如何讓所有地圖標記自動縮放都在可視範圍的區域

首先 可以先了解地圖的邊界值
<img src="assets/images/googlemap_bounds/001.png"  width=100% />

先上 code
[GoogleMap event 參照](https://developers.google.com/maps/documentation/javascript/events)
html

```html
<div id="map"></div>
<div id="info"></div>
```

javascript

```js
function initMap() {
  // 設定估狗地圖
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.0471778, lng: 121.5139815 },
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // 觀察經緯度的變化
  google.maps.event.addListener(map, "bounds_changed", function () {
    var bounds = map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    var strHTML = `NorthEast: ${NE.lat()},${NE.lng()} </br> SouthWest: ${SW.lat()},${SW.lng()} </br>`;

    document.getElementById("info").innerHTML = strHTML;
  });
}
```

<img src="assets/images/googlemap_bounds/002.png"  width=100% />

在地圖上 隨意拖拉 放大縮小 可觀察到值的變動

接著加上多點景點的經緯度 在初始化地圖裡做些修改

```js
var site = [
  {
    lat: '25.0416412',
    lng: '121.5284858',
    name: '華山公園'
  },
  {
    lat: '25.0430612',
    lng: '121.5597497',
    name: '松山文創園區2號倉庫'
  },
  {
    lng: '121.505709',
    lat: '25.136705',
    name: '新北投公園'
  },
  {
    lng: '120.9550342',
    lat: '24.4010777',
    name: '雪霸國家公園'
  },
];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 25.0471778, lng: 121.5139815},
      zoom: 10
      mapTypeId: goole.maps.MapTypeId.ROADMAP
  });

  site.map(e=> {
    // 將標記加上icon
    var marker = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: {lat: parseFloat(e.lat), lng: parseFloat(e.lng)},
      title: e.name
    });
  });
}
```

<img src="assets/images/googlemap_bounds/003.png"  width=100% />
如圖，我們會發現 還有一個`雪霸國家公園`的點沒出現 需要地圖往下拉才看的到

這時後 就需要用到 google.maps.LatLngBounds()

```js
var site...(省略 可參照上一段code)

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.0471778, lng: 121.5139815},
    zoom: 10
    mapTypeId: goole.maps.MapTypeId.ROADMAP
});

//新增多點坐標顯示的矩形
var bounds = new google.maps.LatLngBounds();

    site.map(e=> {
      // 將標記加上icon
      var marker...(省略 可參照上一段code)

      //將所有座標加到可視地圖裡
      bounds.extend(new google.maps.LatLng(parseFloat(e.lat), parseFloat(e.lng)));
    });

    //繪製到地圖
    map.fitBounds(bounds);
```

<img src="assets/images/googlemap_bounds/004.png"  width=100% />

成功！！ 所有地圖標記都出來囉
[codepen 連結](https://codepen.io/mtw/pen/xmmaoN)

文件參照：
[https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds)
