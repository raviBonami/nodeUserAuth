

const {functionHandler} = require('../helpers/errorHandling')

const getFileUpload = (request, response) => {
    response.render('upload')
}

const postFileUpload = (request, response) => {
    if(request.files){
        let file = request.files.file
        let filename = file.name
        file.mv('./uploads/' + filename, (err) => {
            functionHandler(request, response, err,"File uploaded successfully.....!!!","Error occured while uploading file" )
        })
    }
}

module.exports = {
    getFileUpload,
    postFileUpload
}