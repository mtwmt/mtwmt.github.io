// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  url: '',
  baseUrl: 'http://localhost:4201',
  assetsUrl: 'assets',
  google: {
    GA_TRACKING_ID: 'UA-149155162-1',
  },
  title: "Mandy's Website",
  featureImage: 'assets/images/photo.jpg',
  description: '學習記錄',
  keywords: ['blog', 'Angular', 'WebSite'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
