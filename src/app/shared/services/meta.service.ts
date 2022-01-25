import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private title: Title, private meta: Meta) {}

  updateMeta(options: {
    title: string;
    type: string;
    description: string;
    keywords: string[];
  }) {
    const siteName = environment.title;
    const pageTitle = `${options.title}${
      options.title ? ' | ' : ''
    }${siteName}`;

    this.title.setTitle(pageTitle);
    const tags: MetaDefinition[] = [
      { name: 'keywords', content: options.keywords.join(',') },
      { name: 'description', content: options.description },
      { property: 'og:type', content: options.type },
      { property: 'og:title', content: pageTitle },
      { property: 'og:site_name', content: siteName },
      { property: 'og:description', content: options.description },
      { property: 'og:locale', content: 'zh_TW' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: options.description },
    ];

    tags.forEach((tag) => {
      this.meta.removeTag(`name="${tag.name}"`);
      this.meta.removeTag(`property="${tag.property}"`);
      this.meta.addTag(tag);
    });
  }
}
