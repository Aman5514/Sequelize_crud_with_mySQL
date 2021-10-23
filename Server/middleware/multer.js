const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>
    {
        const extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null,file.fieldname +"-"+ Date.now()+extension)
    }
})

const store = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 2
    }
})
module.exports = store;