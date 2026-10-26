import cypress from 'eslint-plugin-cypress';

import baseConfig from '../../eslint.config.mjs';

export default [...baseConfig, cypress.configs.recommended];
