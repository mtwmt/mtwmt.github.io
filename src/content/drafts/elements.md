---
title: "Elements"
date: 2023/10/01
tags: 
- test
---

`code`

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

### Paragraph

Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.

Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.

---

### Emphasis

1. Did you come here for something in **particular** or just general

2. Did you come here for something in <ins>particular</ins>

3. _Did you come here_

4. Did you come here for **something** in particular

5. Did you come here for something in particular

6. Did you come here for something in particular

7. URLs and URLs in angle brackets will automatically get turned into links. [http://www.example.com](http://www.example.com) or

8. [http://www.example.com](http://www.example.com) and sometimes example.com (but not on Github, for example).

---

### Link

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.themefisher.com
[1]: https://gethugothemes.com
[link text itself]: https://www.getjekyllthemes.com

---

### Ordered List

1. List item
2. List item
3. List item
4. List item
5. List item

---

### Unordered List

- List item
- List item
- List item
- List item
- List item

---

### Code and Syntax Highlighting

#### HTML

```html
<ul>
  <li class="nav-item">
    <a class="nav-link" href="/">Home</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="about/">About</a>
  </li>
</ul>
`}
```

---

#### CSS

```css
img {
  vertical-align: middle;
  border: 0;
  max-width: 100%;
  height: auto;
}
```

---

#### JavaScript

```javascript
window.addEventListener("load", (e) => {
  document.querySelector(".preloader").style.display = "none";
});
```

---

### Button

---

### Quote

> Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once.

---

import HeaderLink from '../../components/HeaderLink.astro';

<HeaderLink href="#" onclick="alert('clicked!')">
  Embedded component in M