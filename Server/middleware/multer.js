const multer = require('multer');
const upload = multer({dest:'upload/'});
const storage = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        cb(null,"../upload")
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
        fileSize: 1024 * 1024 * 4
    }
})
module.exports = store;