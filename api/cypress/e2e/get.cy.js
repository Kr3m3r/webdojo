describe('GET /api/users', () => {

    const heroes = [
        {
            name: "Superman",
            email: "clark.kent@dailyplanet.com",
            password: "q1w2e3"
        },
        {
            name: "Batman",
            email: "bruce.wayne@wayneenterprises.com",
            password: "q1w2e3"
        },
        {
            name: "Wonder Woman",
            email: "diana.prince@themiscira.gov",
            password: "q1w2e3"
        },
        {
            name: "Flash",
            email: "barry.allen@centralcitypd.com",
            password: "q1w2e3"
        },
        {
            name: "Aquaman",
            email: "arthur.curry@atlantis.org",
            password: "q1w2e3"
        }
    ]

    before(() => {
        heroes.forEach((hero) => {
            cy.task('deleteUser', hero.email)
            cy.postUser(hero)
        })
    })

    it('Deve retornar uma lista de usuários', () => {

        cy.getUsers().then(response => {

            expect(response.status).to.eq(200)

            heroes.forEach((hero) => {

                const found = response.body.find((user) => user.email === hero.email)

                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })
        })
    })
})