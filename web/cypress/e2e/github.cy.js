describe('Gerencimaneto de Perfis no github', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do github', () => {
        cy.get('#name').type('Diego Kremer')
        cy.get('#username').type('Kremer')
        cy.get('#profile').type('DK')

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.get('#name').type('Diego Kremer')
        cy.get('#username').type('dk')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', 'dk')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Diego Kremer')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')
    })

    it('Deve poder remover um perfil do githun', () => {

        const profile = {
            name: 'Diego Kremer',
            username: 'dk',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')

    })

    it('Deve validar o link do github', () => {

        const profile = {
            name: 'Diego Kremer',
            username: 'dkremer',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
            .and('have.attr','target', '_blank')
    })
})
