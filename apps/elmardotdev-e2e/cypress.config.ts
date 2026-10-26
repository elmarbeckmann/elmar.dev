import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(import.meta.filename, {
      cypressDir: 'src',
      webServerCommands: { default: 'npx nx run elmardotdev:serve' },
      ciWebServerCommand: 'npx nx run elmardotdev:serve:production',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
