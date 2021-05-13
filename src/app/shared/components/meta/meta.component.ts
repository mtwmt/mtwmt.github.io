import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MetaArticle, MetaProfile, MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent implements OnInit, OnChanges {
  @Input() title: string = environment.title;
  @Input() description: string = environment.description;
  @Input() tags: string[] = [];
  @Input() keywords: string[] = [];
  @Input() route: string = this.router.url;
  @Input() image: string = this.absoluteImageUrl(environment.featureImage);
  @Input() twitterImage: string;
  @Input() ogImage: string;
  @Input() robots = 'index, follow';

  // author
  @Input() authorFirstName: string;
  @Input() authorLastName: string;
  @Input() authorUserName: string;

  // article
  @Input() articlePublishedAt: string;
  @Input() articleUpdatedAt: string;
  @Input() articleAuthors: string[];

  constructor(
    private router: Router,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateMetaTags();
  }

  updateMetaTags() {
    this.metaService.generateMetaTags({
      title: this.title,
      description: this.title,
      //TODO: md 尚未有 description, 所以先以標題替代
      // description: this.description,
      route: this.route,
      keywords: this.keywords ? [...this.tags, ...this.keywords] : this.tags,
      image: this.image,
      // twitter_image: this.twitterImage
      //   ? this.getTwitterImage(this.twitterImage)
      //   : null,
      // og_image: this.ogImage ? this.getOgImage(this.ogImage) : null,
      robots: this.robots,
      article: this.getArticle(),
      author: this.getAuthor(),
    });
  }

  private getArticle(): MetaArticle | null {
    if (
      this.articlePublishedAt &&
      this.articleUpdatedAt &&
      this.articleAuthors
    ) {
      return {
        published_time: this.articlePublishedAt,
        modified_time: this.articleUpdatedAt,
        tag: this.tags,
        author: this.articleAuthors,
      };
    }
    return null;
  }
  private getAuthor(): MetaProfile | null {
    if (this.authorFirstName && this.authorLastName && this.authorUserName) {
      return {
        first_name: this.authorFirstName,
        last_name: this.authorLastName,
        username: this.authorUserName,
      };
    }
    return null;
  }
  private getOgImage(ogRoute: string) {
    return `https://mtwmt.github.io/assets/banners${ogRoute}/og.png`;
  }

  private absoluteImageUrl(image: string) {
    return `${environment.url}/${image}`;
  }
}
