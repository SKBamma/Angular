import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from './auth/auth.service';
import { addTokenInterceptor } from './auth/add-token.interceptor';

const bootstrap = () => {
  const authService = inject(AuthService);
  return () => {
    const persisted_state = localStorage.getItem("AppTodo");
    if (persisted_state) {
      authService.state.set(JSON.parse(persisted_state));
    }
  };
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withInterceptors([addTokenInterceptor])),
  provideToastr(), // Toastr providers
  provideAnimationsAsync(),
  { provide: APP_INITIALIZER, multi: true, useFactory: bootstrap }
  ]
};
