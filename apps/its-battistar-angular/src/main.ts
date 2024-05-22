import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { initSentry } from './sentry';

initSentry();

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
  console.error(error);
});
