
const express = require('express')
const app = express();
const {routes} = require('./routes/appRoute')

// const session = require('express-session')

// app.use(session({
//     secret: "A random string key",
//     resave: false,
//     saveUninitialized:false
// }))

const db = require("./database/db")

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs')

app.use('',routes)


app.listen(3000,() => {console.log("8000 listening...")})