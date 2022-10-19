
const express = require('express')

const isAuth = (request, response, next) => {
    console.log(request.session, "++++++++++++")
    if(request.session.isAuth){
        next();
    }else{
        response.redirect('/accessDenied')
    }
}

module.exports = {
    isAuth
}