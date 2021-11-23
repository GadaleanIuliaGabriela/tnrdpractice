describe('frontend: HeaderComponent component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=headercomponent--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to HeaderComponent!');
    });
});
