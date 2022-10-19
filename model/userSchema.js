
const mongoose = require('mongoose')


const validateEmail = (email) => {
    let validEmailType = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validEmailType.test(email)
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    email: {
        type: String ,
        required: true,
        unique: true,
        validate: [validateEmail, "Please enter a valid email"]
    },
    password: {
        type: String ,
        required: true,
    }
})

module.exports = mongoose.model('User', userSchema)