const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./utilities/database')
const userCtrl = require('./controller/usersController')
const postCtrl = require('./controller/postsController')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './image')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+"_"+file.originalname)
  }
})
const upload = multer({ storage: storage })


const corsOptions = {
    origin: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/image",express.static('image'))


app.get('/', (req , res)=>
{
    res.json({ message: "Welcome to create api Ocean" });
})

//  for user routes =====================>

app.get('/read',userCtrl.readAll)

app.post('/add-users', userCtrl.addUser)

app.put('/update',userCtrl.update)

app.delete('/delete',userCtrl.deleteUser)

// for Post routes =======================>

app.post('/add-posts',upload.single("image"),postCtrl.addPost )

app.get('/posts',postCtrl.allPosts)

app.delete('/delete-post',postCtrl.deletePost)

app.get('/userPost',userCtrl.userPost )


// server 

app.listen(port,()=>
{
    console.log(`Server is running at port no ${port}`)
})