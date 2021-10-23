const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require('./utilities/database')
const userCtrl = require('./controller/usersController')
const postCtrl = require('./controller/postsController')
const store = require('./middleware/multer')

const corsOptions = {
    origin: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Database

database.sync().then(() => {
    console.log("Database successfully connnected")
})
.catch((err) =>
{
    console.log("ERROR  : " + err.message)
})

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

app.post('/add-posts',postCtrl.addPost )

app.get('/posts',postCtrl.allPosts)

app.delete('/delete-post',postCtrl.deletePost)

// server 

app.listen(port,()=>
{
    console.log(`Server is running at port no ${port}`)
})