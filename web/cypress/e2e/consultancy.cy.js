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

        //cy.get('#consultancyType').select('inCompany')
        cy.contains('label', 'Tipo de Consultoria')//Elemento irmão
            .parent()//elemento PAI
            .find('select') //busca dentro do pai o elemento select
            .select('inCompany')//selecciona o valor, poderia clicar, preencher

        ////span[text()="Pessoa Física"]/..//input
        //exemplo no Xpath
        cy.contains('span', 'Pessoa Física')
            .parent()
            .find('input')
            .click() //pode ser o check
            .should('be.checked')

        // cy.contains('label', 'Pessoa Jurídica') //Usando o label, já pega o elemento pai e acha o 1º filho
        //     .find('input')
        //     .click() //pode ser o check

        cy.contains('span', 'Pessoa Jurídica')
            .parent()
            .find('input')
            .should('be.not.checked') //garantir que o outro campo não está marcado. Um doublçe check

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('01512967076')
            .should('be.value', '015.129.670-76')


        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/Planta Baixa.pdf', {force: true})

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type('Textão')
        

    })
})