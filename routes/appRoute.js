

const express = require('express')
const routes = express.Router();
const { getLandingPage, getLoginPage, getSignUpPage, postSignup, postLogin, getSecret,getAccessDenied,logout} = require('../controllers/userController')
const {   getAllTasks, postTask, updateTask, deleteTask } = require('../controllers/taskController')
routes.use(express.urlencoded({ extended: true }))
const session = require('express-session')
const {isAuth} = require('../middleware/isAuth')
const { check, validationResult }= require('express-validator');
const {uploadFile} = require('../controllers/uploadController')
const {upload} = require('../middleware/uploadware')
const { getFileUpload, postFileUpload } = require('../controllers/fileUploadController')
const uploadFileExpress = require('express-fileupload')

const MongoSession = require('connect-mongodb-session')(session)

const store = new MongoSession({
    uri:'mongodb://localhost:27017/users',
    collection: "myUsers"
})

routes.use(session({
    secret: "A random string key",
    resave: false,
    saveUninitialized:false,
    store: store
}))


routes.get('/',getLandingPage)

routes
.get("/signup", getSignUpPage)
.post("/signup", postSignup)

routes
.get("/login", getLoginPage)
.post("/login", postLogin)

routes.get('/dashboard',isAuth, getSecret)

routes.get('/accessDenied', getAccessDenied)

routes.post('/logout',logout)

routes
.get('/task',getAllTasks)
.post('/task',[check('taskid').isNumeric().exists(),check('task').isString().exists(),check('importance').isString().exists()] , postTask)
.patch('/task/:id',[check('taskid').isNumeric(),check('task').isString(),check('importance').isString()],updateTask)
.delete('/task/:id', deleteTask)

routes
.post('/upload',upload,uploadFile)


routes.use(uploadFileExpress())

routes
.get('/fileupload',  getFileUpload)
.post('/fileupload', postFileUpload)


module.exports = {
    routes,
}