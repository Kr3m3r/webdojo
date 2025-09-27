const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON format.' })
    }
    next()
})

app.get('/', (req, res) => {
    res.json({ message: 'Diego Kremer' })
})

app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name field is required' })
    }
    if (!email) {
        return res.status(400).json({ error: 'Email field is required' })
    }
    if (!password) {
        return res.status(400).json({ error: 'Password field is required' })
    }

    try {
        // Create user in the database
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            },
        })

        return res.status(201).json({
            message: 'User successfully registered',
            user: newUser
        })

    } catch (error) {
        if (error.code === 'P2002') { // unique constraint violation (duplicate email)
            return res.status(409).json({ error: 'Email address is already in use' })
        }

        console.error(error)
        return res.status(500).json({ error: 'Internal server error while registering user' })
    }
})

app.get('/api/users', async (req, res) => {

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' })
    }

})

app.put('/api/users/:id', async (req, res) => {

    console.log(req.params.id)
    console.log(req.body)

    const { id } = req.params
    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Name field is required' })
    }
    if (!email) {
        return res.status(400).json({ error: 'Email field is required' })
    }
    if (!password) {
        return res.status(400).json({ error: 'Password field is required' })
    }

    try {

        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found!' })
        }

        await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, password }
        })

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error: 'Error updating user :(' })
    }
})

app.delete('/api/users/:id', async (req, res) => {

    const { id } = req.params

    try {

        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found!' })
        }

        await prisma.user.delete({ where: { id: Number(id) } })

        return res.status(204).end()

    } catch (error) {

        res.status(500).json({ error: 'Failed to delete user :(' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
