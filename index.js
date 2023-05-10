require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({ message: 'Oi express!' })

})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// entregar uma porta
mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.kurkvyk.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao Mongo')
    app.listen(3000)
})
.catch((err) => console.log(err))