describe('Funcionalidade: Compra de Produto', () => {

    beforeEach(() => {
      cy.visit('http://lojaebac.ebaconline.art.br')
    })
  
    it('Deve realizar uma compra com sucesso até o checkout', () => {
      cy.get('.product-block').first().click()
  
      cy.get('.button-variable-item-XS', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true })
  
      cy.get('.button-variable-item-White', { timeout: 10000 })
        .should('be.visible')
        .click({ force: true })

      // Reforça a seleção do tamanho após escolher a cor, sem isso o botão "Adicionar ao carrinho" falha
      cy.get('.button-variable-item-XS', { timeout: 10000 }).click({ force: true })
  
      cy.get('.single_add_to_cart_button')
        .should('not.be.disabled')
        .click()
  
      cy.get('.woocommerce-message', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'foi adicionado no seu carrinho')
  
      cy.get('.woocommerce-message > .button').click()
  
      cy.get('.product-name > a')
        .should('be.visible')
  
      cy.get('.checkout-button').click()
  
      cy.get('#billing_first_name').clear().type('Adriany')
      cy.get('#billing_last_name').clear().type('Caroline')
      cy.get('#billing_address_1').clear().type('Rua Teste 123')
      cy.get('#billing_city').clear().type('São Paulo')
      cy.get('#billing_postcode').clear().type('01000-000')
      cy.get('#billing_phone').clear().type('11999999999')
      cy.get('#billing_email').clear().type('adrianycaroline133@gmail.com')
  
      cy.get('#payment_method_cheque').check({ force: true })
      cy.get('#terms').click()
  
      cy.get('#place_order').click()
  
      // Validação de pedido finalizado com sucesso
      cy.get('.woocommerce-notice', { timeout: 20000 })
        .should('be.visible')
        .and('contain', 'Obrigado. Seu pedido foi recebido.')
    })
})