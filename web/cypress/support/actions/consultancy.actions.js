Cypress.Commands.add('fillConsultancyForm', (form) => {

    //const consultancyForm = this.consultancyData.personal
    //const consultancyForm = consultancyData.personal

    cy.get('#name').type(form.name)
    cy.get('input[placeholder="Digite seu email"]').type(form.email)
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
        .should('have.value', '(51) 99875-6540')

    //cy.get('#consultancyType').select('inCompany')
    cy.contains('label', 'Tipo de Consultoria')//Elemento irmão
        .parent()//elemento PAI
        .find('select') //busca dentro do pai o elemento select
        .select(form.consultancyType)//selecciona o valor, poderia clicar, preencher

    if (form.personType === 'cpf') {
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
            .type(form.document)
            .should('be.value', '015.129.670-76')

    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)


    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms === true) {

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')
    }

})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click();
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})