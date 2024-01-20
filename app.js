const express =require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3001;
const bodyParser = require("body-parser");

// DB CONNECTION 

// mongoose.connect("mongodb://localhost:27017/login", {
//     useNewUrlParser : true,
//     useUnifiedTopology:true
// }, (err) =>{
//     if(!err) 
//     {
//         console.log("connected to db ")
//     }else {
//         console.log("error")

//     }
// })

app.use(express());
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

const connectionUrl = 'mongodb+srv://doadmin:079625yqT83eXMWV@db-mongodb-blr1-37098-c28f0982.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';


app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.put('/login',(req,res)=>{
    console.log(req.body.username);
    if (req.body.username==="mj"&req.body.password==="Pace2012#") {

     return   res.json({status: 200, message: "Login Successfully! Welcome mj"});
    } else {
     return   res.json({
        status: 401,
        message: "Wrong User Name Or Password"});
    }
    // res.send("Hello World")
})

// mongoose.connect(connectionUrl,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
    
    
// }).then(su=>{
//     if (su) {
//         console.log('Mongodb Connect')
//     }
// }).catch(e=>{
//     console.log(e)
// })


mongoose.connect("mongodb://localhost:27017/login", {
    useNewUrlParser : true,
    useUnifiedTopology:true
}, (err) =>{
    if(!err) 
    {
        console.log("connected to db ")
    }else {
        console.log("error")

    }
})


//   SCHEMA

const  sch = {
    name : String,
    email : String,
    id : Number
}
const monmodel = mongoose.model("logindata",sch);

//  Post

app.post("/post",async(req,res) => {
    console.log("inside post function");

    const data = new monmodel ({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    });

    const val = await data.save();
    res.json(val);
})



app.listen(port, ()=>{
    console.log("The Server is running at" + port);

})

