import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';

export const config: ApplicationConfig = {
  providers: [provideZoneChangeDetection(), provideServerRendering()],
};
