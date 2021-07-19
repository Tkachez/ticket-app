require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

const DB_URL = process.env.REACT_APP_DB_URL

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: DB_URL
});

const csrfMiddleware = csrf({cookie: true})
const app = express()

const PORT = '5000'

app.use(bodyParser.json())
app.use(cookieParser())
app.use(csrfMiddleware)

app.all('*')

app.get('/', (req, res) => {
    res.send('Hello Server!')
})
app.listen(PORT, () => {
    console.log(`Server runs on http://localhost:${PORT}`)
})