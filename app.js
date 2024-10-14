require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./routes/loginRoute')
const signupRouter = require('./routes/signupRoute')
const userDataRouter = require('./routes/userDataRoute')

app.get('/', (request, response) => {
    response.send(`<h1>Hello World!</h1> It's working`)
})

app.use(cors())
app.use(express.json());



mongoose.connect(process.env.DB_URL , { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open', () => console.log('Connected to db successfully'))

app.use('/api/v1/login',loginRouter)
app.use('/api/v1/signup',signupRouter)
app.use('/api/v1/userdata',userDataRouter)


app.listen(PORT, console.log(`Server running at http://localhost:${PORT}/api/v1/login`))