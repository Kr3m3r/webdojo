describe('iFrame', () => {
    it('deve poder tocar o video', () => {

        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Video').click()

        cy.get('iframe[title="Video Player"]') //obtém a tag do iframe
            .should('exist')                       //verifica se existe
            .its('0.contentDocument.body')          //pega o corpo html do iframe
            .then(cy.wrap)                          //tranforma em objeto cypress
            .as('iFramePlayer')                 //alias para o iframe pego.

        cy.get('@iFramePlayer') //agora com o objeto iframe é possível aplicar ações do cypress
            .find('.play-button')
            .click()

         cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
    })
})