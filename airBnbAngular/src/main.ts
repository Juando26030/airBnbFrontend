import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


//   import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter, Route } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import routeConfig from './app/routes';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routeConfig)
//   ]
// }).catch(err => console.error(err));