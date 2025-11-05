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

    it('Não deve permitir finalizar a compra sem preencher campos obrigatórios', () => {
      cy.get('.product-block').first().click()
    
      cy.get('.button-variable-item-XS').click({ force: true })
      cy.get('.button-variable-item-White').click({ force: true })
      cy.get('.button-variable-item-XS').click({ force: true })
      cy.get('.single_add_to_cart_button').click()
    
      cy.get('.woocommerce-message > .button').click()
      cy.get('.checkout-button').click()
    
      // Intencionalmente não preenche os campos obrigatórios
      cy.get('#place_order').click()
    
      // Validação: verificar mensagens de erro
      cy.get('.woocommerce-error')
        .should('be.visible')
        .and('contain', 'Nome')
        .and('contain', 'Sobrenome')
        .and('contain', 'Endereço')
        .and('contain', 'Cidade')
        .and('contain', 'CEP')
        .and('contain', 'Telefone')
        .and('contain', 'Endereço de e-mail')
    })

    it('Deve remover um produto do carrinho com sucesso', () => {
      cy.get('.product-block').first().click()
    
      cy.get('.button-variable-item-XS').click({ force: true })
      cy.get('.button-variable-item-White').click({ force: true })
      cy.get('.button-variable-item-XS').click({ force: true })
      cy.get('.single_add_to_cart_button').click()
    
      cy.get('.woocommerce-message')
        .should('contain', 'foi adicionado no seu carrinho')
    
      cy.get('.woocommerce-message > .button').click()
    
      // Remove o produto do carrinho
      cy.get('.remove > .fa').click()
    
      // Validação: o carrinho deve ficar vazio
      cy.get('.cart-empty')
        .should('be.visible')
        .and('contain', 'Seu carrinho está vazio.')
    })

    it('Deve atualizar a quantidade de um produto no carrinho', () => {
      cy.get('.product-block').first().click()
    
      cy.get('.button-variable-item-XS').click({ force: true })
      cy.get('.button-variable-item-White').click({ force: true })
      cy.get('.button-variable-item-XS').click({ force: true })
      cy.get('.single_add_to_cart_button').click()
    
      cy.get('.woocommerce-message')
        .should('contain', 'foi adicionado no seu carrinho')
    
      cy.get('.woocommerce-message > .button').click()
    
      // Captura o valor do produto unitário
      cy.get('.cart_item .product-price .woocommerce-Price-amount bdi')
        .invoke('text')
        .then((priceText) => {
          const precoUnitario = parseFloat(priceText.replace('R$', '').replace(',', '.'))
    
          // Altera a quantidade para 2
          cy.get('.quantity input.qty').clear().type('2')
    
          // Atualiza o carrinho
          cy.get('[name="update_cart"]').click()
      
          // Aguarda a atualização do carrinho
          cy.get('.woocommerce-message', { timeout: 10000 })
            .should('contain', 'Carrinho atualizado')
    
          // Calcula o subtotal
          cy.get('.cart-subtotal .woocommerce-Price-amount bdi')
            .invoke('text')
            .then((subtotalText) => {
              const subtotal = parseFloat(subtotalText.replace('R$', '').replace(',', '.'))
                expect(subtotal).to.be.closeTo(precoUnitario * 2, 0.5)
              })
        })
    })
})