describe('iFrame', () => {
    it('deve poder tocar o video', () => {

        cy.login(true)

        cy.contains('Video').click()

        //think time
        cy.wait(3000)//espera para garantir que o iframe vai carregar

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