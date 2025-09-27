describe('DELETE /api/users/:id', () => {

    context('Remoção', () => {

        let userId

        const user = {
            name: 'Bruce Banner',
            email: 'hulk@mervel.com',
            password: 'q1w2e3'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve remover usuário existente', () => {

          cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                const hullk = response.body.find(user => user.id === userId)
                expect(hullk).to.be.undefined
            })
        })

    })

    context('Quando o id não existe', () => {

        let userId
        
        const user = {
            name: 'Tony stark',
            email: 'stark@marvel.com',
            password: 'q1w2e3'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })

            cy.task('deleteUser', user.email)
        })

        it('Deve retornar 404 e user not found', () => {

            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found!')
            })
        })
    })
})