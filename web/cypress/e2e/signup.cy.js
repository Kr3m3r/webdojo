describe('Cadastro', () => {
    beforeEach(() => {
        cy.goToSignUp()

        //Mock para simular os dados da API
        /*
        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Usuário cadastrado com sucesso'
            }
        }).as('postSignup')
*/
    })

    it('Deve cadastrar um novo usuário', () => {

        cy.get('#name').type('Diego Kremer')
        cy.get('#email').type('diegok86@gmail.com')
        cy.get('#password').type('123456')

        cy.contains('button', 'Criar conta').click()

        //cy.wait('@postSignup')

        cy.contains('Conta criada com sucesso!')
            .should('be.visible')

    })
})