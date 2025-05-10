describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Teste de Calculadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it("Deve exibir ‘0’ no display", () => {
    cy.get('.display').should('have.text', '0');
  });

    it('Exibição inicial', () => {
    cy.get('.display').should('have.text', '0');
  });

  it('Digitação de múltiplos dígitos', () => {
    cy.clickButtons(['1', '2', '3']);
    cy.get('.display').should('have.text', '123');
  });

  it('Ignorar zeros à esquerda', () => {
    cy.clickButtons(['0', '0', '5']);
    cy.get('.display').should('have.text', '5');
  });

  it('Inserção de ponto decimal', () => {
    cy.clickButtons(['.', '5', '6']);
    cy.get('.display').should('have.text', '0.56');
  });

  it('Bloqueio de múltiplos pontos decimais', () => {
    cy.clickButtons(['1', '.', '2', '.', '3']);
    cy.get('.display').should('have.text', '1.23');
  });

  it('Adição simples', () => {
    cy.clickButtons(['5', '+', '3', '=']);
    cy.get('.display').should('have.text', '8');
  });

  it('Subtração simples', () => {
    cy.clickButtons(['9', '-', '4', '=']);
    cy.get('.display').should('have.text', '5');
  });

  it('Multiplicação simples', () => {
    cy.clickButtons(['6', '×', '7', '=']);
    cy.get('.display').should('have.text', '42');
  });

  it('Divisão simples', () => {
    cy.clickButtons(['8', '÷', '2', '=']);
    cy.get('.display').should('have.text', '4');
  });

  it('Divisão por zero', () => {
    cy.clickButtons(['5', '÷', '0', '=']);
    cy.get('.display').should('match', /Error|Infinity/);
  });

  it('Operação sequencial (2 + 3 × 4 = 14)', () => {
    cy.clickButtons(['2', '+', '3', '×', '4', '=']);
    cy.get('.display').should('have.text', '14');
  });

  it('Limpar display (AC)', () => {
    cy.clickButtons(['1', '2', '3', 'AC']);
    cy.get('.display').should('have.text', '0');
  });

  it('Operação após resultado', () => {
    cy.clickButtons(['5', '+', '3', '=', '+', '2', '=']);
    cy.get('.display').should('have.text', '10');
  });

  it('Troca de operador', () => {
    cy.clickButtons(['5', '+', '×', '3', '=']);
    cy.get('.display').should('have.text', '15');
  });

  it('Números negativos (5 - 7 = -2)', () => {
    cy.clickButtons(['5', '-', '7', '=']);
    cy.get('.display').should('have.text', '-2');
  });

  it('Máximo de dígitos no display', () => {
    cy.clickButtons(Array(16).fill('1'));
    cy.get('.display').invoke('text').should('have.length.at.most', 15);
  });

  it('Operação sem segundo número (5 + =)', () => {
    cy.clickButtons(['5', '+', '=']);
    cy.get('.display').should('have.text', '5');
  });

  it('Pressionar = sem operação (5 =)', () => {
    cy.clickButtons(['5', '=']);
    cy.get('.display').should('have.text', '5');
  });

  it('Operação com decimal (0.5 × 2 = 1)', () => {
    cy.clickButtons(['.', '5', '×', '2', '=']);
    cy.get('.display').should('have.text', '1');
  });

  it('Reset após erro (5 ÷ 0 = Error → AC)', () => {
    cy.clickButtons(['5', '÷', '0', '=', 'AC']);
    cy.get('.display').should('have.text', '0');
  });
});

Cypress.Commands.add('clickButtons', (buttons) => {
  buttons.forEach(btn => {
    cy.contains('button', btn).click();
  });
});