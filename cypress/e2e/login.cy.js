import '../support/commands'

describe('Funcionalidade: Login', () => {
    beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br')
    })
  
    it('Deve fazer login com sucesso', () => {
        cy.fixture('user').then((user) => {
          cy.get('.icon-user-unfollow').click()
          cy.get('#username').type(user.email)
          cy.get('#password').type(user.senha)
          cy.get('.woocommerce-form > .button').click()
    
          // Validação de login com sucesso
          cy.get('.page-title').should('contain', 'Minha conta')
        })
      }) 
      
    it('Deve exibir mensagem de erro ao inserir e-mail inválido', () => {
        cy.get('.icon-user-unfollow').click()
        cy.get('#username').type('emailinvalido@teste.com')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
      
        // Validação de erro para e-mail inválido
        cy.get('.woocommerce-error')
        .should('be.visible')
        .and('contain', 'Endereço de e-mail desconhecido')
    })
  
    it('Deve exibir mensagem de erro ao inserir senha inválida', () => {
        cy.fixture('user').then((user) => {
         cy.get('.icon-user-unfollow').click()
         cy.get('#username').type(user.email)
         cy.get('#password').type('senhaerrada')
         cy.get('.woocommerce-form > .button').click()
  
        // Validação de erro para senha inválida
        cy.get('.woocommerce-error')
        .should('be.visible')
        .and('contain', 'A senha fornecida para o e-mail')
        .and('contain', 'está incorreta. Perdeu a senha?')
        })
    })
  })
  