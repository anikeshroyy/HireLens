const express = require('express')
const connectDB = require('./src/config/db')
const userModel = require('./src/models/User')

const authRouter = require('./src/routes/authRoutes')
const jobRouter = require('./src/routes/jobRoutes')
const loginRouter = require('./src/routes/loginRoutes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const PORT = 3000;

connectDB();

app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.use('/', authRouter)
app.use('/', jobRouter)
app.use('/', loginRouter)


app.listen(PORT, () => {
    console.log("Server Started...");
})