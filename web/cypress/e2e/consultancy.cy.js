describe('Formulário de Consukltori', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.get('#name').type('Diego Kremer')
        cy.get('input[placeholder="Digite seu email"]').type('diegok86@gmail.com')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('51 99875-6540')
            .should('have.value', '(51) 99875-6540')
    })
})