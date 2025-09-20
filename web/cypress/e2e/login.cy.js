import { getCurrentDate } from "../support/utils.cy"

describe('Login', () =>{

  it.only('Deve logar com sucesso', ()=>{

    cy.start()
    //cy.viewport('iphone-xr') //simular responsividade na resolução Mobile.
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
     
    //Obter item no cookie e validar o valor. que neste caso é uma data
    cy.getCookie('login_date').should('exist')


    cy.getCookie('login_date').should( (cookie) => {
      expect(cookie.value).to.eq( getCurrentDate() )
      })
    
    //Obetem item no localstorage
    //Validacao do localStorage, valida o token feito em md5 através de uma expressão regular.
    cy.window().then( (win) => {
        const token = win.localStorage.getItem('token')
        expect(token).to.match(/^[a-fA-F0-9]{32}$/)
      })
  
    })
  
  it('Não deve logar com senha inválida', ()=>{
    
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
    })

  it('Não deve logar com email não cadastrado', ()=>{
      
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
    })
})

 