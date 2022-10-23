---
layout: python
title: 初探 Python，用 Python 來寫個爬蟲吧
categories:
  - python
tags:
  - python
  - ironman
date: 2022/10/23
---

## 安裝 python

可到 https://www.python.org/ 這裡進行下載符合作業系統的 python 使用。
網路上有很多 python 安裝教學，這裡就不再贅述囉

這裡安裝的版本是 `Python 3.10.8`

---

## pip 指令筆記

這裡只有列出目前有在使用的。

- 查詢 python 版本

```bash
pip -V
```

- 查詢目前已安裝套件

```bash
pip list
```

- 安裝套件

```bash
pip install <packageName>
```

- 移除套件

```bash
pip uninstall <packageName>
```

---

## 新增 python 爬蟲套件

開啟 CMD

### requests

- 使用 python requests 函式庫向伺服器發送請求
  install requests

```bash
pip install requests
```

[requests 官方文件](https://requests.readthedocs.io/projects/cn/zh_CN/latest/)

### Beautiful Soup 4

- 用來解析網頁資料

```bash
pip install bs4
```

[bs4 官方文件](https://www.crummy.com/software/BeautifulSoup/bs4/doc.zh/)

---

## 開始爬蟲世界

這次主要爬的是 2022 年 ithome 鐵人賽的主題

### 撰寫程式注意事項

要是一不小心沒注意到很容易就會踩到雷哦！

- python 的程式語言裡是有分大小寫
- 使用縮排區分程式區塊，所以縮排必須保持一致，否則可能會出縮排的錯誤。

下面是練習的第一版程式

```python
# import 需要使用到的套件
import requests
from bs4 import BeautifulSoup
import json

url  = 'https://ithelp.ithome.com.tw/2022ironman/signup/list'

# ithome 這裡有防毒惡意程式爬資料，所以將爬蟲程式偽裝成瀏覽器，放在headers裡
userAgent = {"user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"}

# 向伺服器發送請求
r = requests.get(url, headers=userAgent)

if r.status_code == 200: # 請求成功
  nums = []
  cacheData = []
  soup = BeautifulSoup(r.text, 'html.parser')
  # 開始爬網頁內容，此為網頁裡的 class name
  pages = soup.select('nav.pagination-container span.pagination-inner')

  # 取得頁碼裡的資訊
  for item in pages:
    for num in item.find_all('a'):
      if num.text.isdigit():
        nums.append(int(num.text))
  # 取得總頁數
  maxPage = max(nums)

  # 取得所有頁面的資料
  for page in range(maxPage):
    # f'{url}?page={page + 1}' 格式化網址
    res = requests.get(f'{url}?page={page + 1}', headers=userAgent)
    soup1 = BeautifulSoup(res.text, 'html.parser')
    topic = soup1.find_all('a', {'class':'contestants-list__title'})
    for tag in topic:
      # 得到資料後，將需要的資訊存到 cacheData
      cacheData.append({
        'year': '2022',
        'title': tag.text.strip(),
        'url': tag.get('href', None),
      })

  # 打開要存的 json 檔，注意資料夾裡要的這個檔案哦。不然會噴錯
  f = open('ironman2022.json', 'a')
  # 把資料寫進 json裡
  f.write(json.dumps(cacheData))
  # 關閉 json 檔
  f.close()
else: # 請求失敗
  print('error', r.status_code)
```

完成後到 CMD 執行程式

```bash
py <檔案名稱>.py
```

### 優化程式碼

上面的程式看起來有點落落長，其實有些能包成 function 去處理，找了一下 function 的寫法
python 的 function 是使用 `def` 來宣告

```python
import requests
from bs4 import BeautifulSoup
import json

url  = 'https://ithelp.ithome.com.tw/2022ironman/signup/list'
userAgent = {"user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"}

def getMaxPageNumber(pagination):
  nums = []
  for item in pagination:
    for num in item.find_all('a'):
      if num.text.isdigit():
        nums.append(int(num.text))
  return max(nums)

r = requests.get(url, headers=userAgent)
if r.status_code == 200:
  soup = BeautifulSoup(r.text, 'html.parser')
  pages = soup.select('nav.pagination-container span.pagination-inner')
  maxPage = getMaxPageNumber(pages)
  cacheData = []
  for page in range(maxPage):
    res = requests.get(f'{url}?page={page + 1}', headers=userAgent)
    soup1 = BeautifulSoup(res.text, 'html.parser')
    topic = soup1.find_all('a', {'class':'contestants-list__title'})
    for tag in topic:
      cacheData.append({
        'year': '2022',
        'title': tag.text.strip(),
        'url': tag.get('href', None),
      })
  f = open('ironman2022.json', 'a')
  f.write(json.dumps(cacheData))
  f.close()
else:
  print('error', r.status_code)
```

優化後，可讀性看起來好多了 ^\_^

---

初探 python 成功！！
如果有更好的作法也歡迎與我分享哦

<!-- 在 瀏覽器上執行 python https://realpython.com/brython-python-in-browser/ -->
