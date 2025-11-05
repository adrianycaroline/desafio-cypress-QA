# Desafio Cypress QA

Este projeto foi desenvolvido como parte de um desafio de automação de testes utilizando **Cypress**, com o objetivo de validar fluxos críticos de uma loja virtual: [Loja EBAC](http://lojaebac.ebaconline.art.br).

---

## Instalação do Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/adrianycaroline/desafio-cypress-QA.git
2. Acesse o diretório do projeto:
   ```bash
    cd desafio-cypress-QA
3. Instale as dependências:
   ```bash
   npm install
4. Execute o Cypress
   ```bash
   npx cypress open
## Cenários Automatizados
### Compra de Produto
2. Realizar compra completa com sucesso até o checkout
3. Remover produto do carrinho
4. Atualizar quantidade de produto no carrinho
5. Tentar finalizar compra sem preencher campos obrigatórios
### Login
1. Login com sucesso
2. Login com falha (credenciais inválidas)

## Motivo da escolha
O fluxo de compra foi escolhido por ser o mais reutilizável e representar operações críticas em um e-commerce, cobrindo:
1. Interações com produto, carrinho e checkout
2. Validações de mensagens e cálculos dinâmicos
3. Cenários negativos e positivos

## Tecnologias Utilizadas
1. Cypress
2. Node.js
3. JavaScript (ES6)

## Autor
Adriany Caroline
