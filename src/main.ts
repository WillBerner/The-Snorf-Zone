import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { ServerService } from './app/services/server.service';
import { appConfig } from './app/app.config';
 
// Factory function for the initializer
function initializeServer(serverService: ServerService) {
  return () => serverService.warmUpServer();
}
 
// Add this to your appConfig or bootstrapApplication:
export const extendedConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeServer,
      deps: [ServerService],
      multi: true
    }
  ]
};

bootstrapApplication(App, extendedConfig);