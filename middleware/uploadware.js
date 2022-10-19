const multer = require("multer")

const upload = multer({
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            callback(null, "uploads")
        },
        filename: (request, file, callback) => {
            console.log(file.originalname.split(".")[1])
            callback(null, file.fieldname + file.originalname.split(".")[1])
        }
    })
}).single("newFile2");

module.exports = {
    upload
}