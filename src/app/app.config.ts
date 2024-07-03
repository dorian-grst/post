import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  ChevronLeft,
  CornerRightDown,
  LogOut,
  LucideAngularModule,
  Pen,
  Plus,
  X,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        Plus,
        ChevronLeft,
        CornerRightDown,
        X,
        Pen,
        LogOut,
      })
    ),
  ],
};
