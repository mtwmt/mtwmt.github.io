import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs';
import { HighlightService } from 'src/app/shared/services/highlight.service';
import { PlatformService } from 'src/app/shared/services/platform.service';
import { MarkdownMeta } from 'utils';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostsComponent implements OnInit, AfterViewInit {
  get isServer() {
    return this.platformService.isServer;
  }

  postMeta$ = this.activatedRoute.data.pipe(
    map((data) => data['content'] as MarkdownMeta),
    map((postMeta) => ({
      ...postMeta,
      content: this.domSanitizer.bypassSecurityTrustHtml(postMeta.content),
    })),
    tap((res) => console.log('sadsadas', res))
  );

  // postContent$ = this.postMeta$.pipe(
  //   map((postMeta) => {
  //     return this.domSanitizer.bypassSecurityTrustHtml(postMeta.content);
  //   })
  // );

  constructor(
    private platformService: PlatformService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.highlightService.highlightAll();
  }
}
