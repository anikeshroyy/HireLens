const express = require('express')
const cors = require('cors')

const connectDB = require('./src/config/db')

const cookieParser = require('cookie-parser')

const authRouter = require('./src/routes/authRoutes')
const jobRouter = require('./src/routes/jobRoutes')
const loginRouter = require('./src/routes/loginRoutes')
const currentUserRouter = require('./src/routes/currentUserRoutes')

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

const PORT = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.use('/', authRouter)
app.use('/', jobRouter)
app.use('/', loginRouter)
app.use('/', currentUserRouter)
// app.use('/', currentUserRouter)


app.listen(PORT, () => {
    console.log("Server Started...");
})