import { getGreeting } from '../support/app.po';

describe('elmardotdev', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the name', () => {
    getGreeting().contains('Elmar Beckmann');
  });
});
