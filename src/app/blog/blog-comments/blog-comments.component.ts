import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.scss']
})
export class BlogCommentsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    const script = this.renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'mtwmt/mtwmt.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.text = ``;
    this.renderer2.appendChild(this.document.querySelector('#blog-comments'), script);
  }

}
