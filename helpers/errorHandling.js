

const functionHandler = (request, response,err,completeStr, errStr) => {
    if(err){
        response.send(errStr)
        response.end();
    }else{
        response.send(completeStr)
        response.end()
    }
}



module.exports = {
    functionHandler
}