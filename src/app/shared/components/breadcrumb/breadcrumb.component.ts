import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, RouteConfigLoadEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs$: Observable<any>;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {


    this.breadcrumbs$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map((event) => {
        const root: ActivatedRoute = this.activatedRoute.root;
        return this.createBreadcrumbs(root);
      })
    );
  }

  private createBreadcrumbs(route, url: string = '', breadcrumbs = []): any {

    const children = route.firstChild;

    if (!children) {
      return breadcrumbs;
    }

    const routeURL: string = children.snapshot.url
      .map(segment => segment.path)
      .join('/');

    const label = children.snapshot.data.breadcrumb;

    if (!label) {
      return this.createBreadcrumbs(children, url, breadcrumbs);
    }

    if (!routeURL) {
      url += `/${routeURL}`;
    }

    const breadcrumb = {
      label,
      params: children.snapshot.params,
      url: routeURL
    };

    return this.createBreadcrumbs(children, url, [...breadcrumbs, breadcrumb]);
  }

}
