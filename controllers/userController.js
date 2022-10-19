
const userModel = require('../model/userSchema')
const bcrypt = require('bcryptjs')

// Get Landing page
const  getLandingPage = (request, response) => {
    console.log(request.session)
    try{
        response.render('landing')
    }catch(err){
        response.send("Something went wrong, please try again")
        response.end();
    }
    
}


// Get login page
const getLoginPage = (request, response) => {
    try{
        response.render('login')
    }catch(err){
        response.status(500).send("Something went wrong, please try again")
        response.end();
    }
    
}


// Get sign up page
const getSignUpPage = (request, response) => {
    try{
        response.render('signup')
    }catch(err){
        response.send("Something went wrong, please try again")
        response.end();
    }
    
}


// Post new user
const postSignup = async (request, response) => {
    try{
        const {username, email, password } = request.body

        let user = await userModel.findOne({email})
    
        if(user){
            return response.redirect('/signup')
        }
    
        const hashedPassword = await bcrypt.hash(password, 12)
        user = new userModel({
            username,
            email,
            password:hashedPassword
        })
    
        await user.save();
        response.redirect('/login')
    }catch(err){
        console.log("error: ", err);
    }

}


// Login user
const postLogin = async (request, response) => {
    try{
        const {email, password} = request.body;
        const user = await userModel.findOne({email})
    
        if(!user) {
            return response.redirect('/login')
        }
    
        const match = await bcrypt.compare(password, user.password)
    
        if(!match){
            return response.redirect('/login')
        }
        request.session.isAuth = true;
        response.redirect('/dashboard')

    }catch(err){
        console.log("error: ", err)
        response.status(501).send("Something went wrong..")
        response.end();
    }
   
}


// Get protected route
const getSecret = (request, response) => {
    console.log(request,"---------")
    try{
        response.render('dashboard')
    }catch(err){
        response.status(501).send("Something went wrong..")
        response.end();
    }
    
}


// Access Denied
const getAccessDenied = (request, response) => {
    try{
        response.render('accessDenied')
    }catch(err){
        response.status(501).send("Something went wrong..")
        response.end();
    }
}


// User Logout
const logout = (request,response) => {
    request.session.destroy((err) => {
        if(err){
            throw new err;
        }
        response.redirect('/login')
    });
    
}

module.exports = {
    getLandingPage,
    getLoginPage,
    getSignUpPage,
    postSignup,
    postLogin,
    getSecret,
    getAccessDenied,
    logout
}

