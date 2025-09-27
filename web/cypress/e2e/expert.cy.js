import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Formulário de Consultoria', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', () => {
        //Possivel alterar campos Only Ready.
        //
        cy.get('#email').invoke('val', 'diegok86@gmail.com')

        cy.get('#password').invoke('attr', 'type', 'text')
            .type('123456')

        cy.get('#password').invoke('removeAttr', 'class')
            .type('123456')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('Não deve logar com senha inválida', () => {

        //Simulação tecla ENTER no formulário
        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('123456{Enter}')

        cy.wait(2500)

        cy.document().then((doc) => {
            cy.writeFile('cypress/download/page.html', doc.documentElement.outerHTML)
        })

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        //elemento deixou de existir na pagina... usar not.exist
        cy.get('@toast')
            .should('not.exist')
    })

    it('Simulando a tecla tab com cy.press', () => {

        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')
    })

    it.only('Deve realizar uma carga de dados fakes', () => {

        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = '123456'

            cy.log(name)
            cy.log(email)
            cy.log(password)
        })
    })
})