const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require ("./model");
const usrCtrl = require("./controller/userController")

app.use(bodyParser.json())

app.get("/",(req,res)=>{
res.send("helo")
 })


 app.get("/add",usrCtrl.addUser)
 app.get("/users",usrCtrl.getUsers)
 app.get("/users/:id",usrCtrl.getUser)
 app.post("/create",usrCtrl.postUsers)
 app.delete("/users/:id",usrCtrl.deleteUsers)
app.patch("/users/:id",usrCtrl.updateUsers)
app.get("/query",usrCtrl.queryUsers)
app.get("/find",usrCtrl.findUsers)
app.get("/get-set-virtual",usrCtrl.getSetVirtualUsers)
app.get("/raw-queries",usrCtrl.rawQueries)
app.get("/one-to-one",usrCtrl.oneToOneUser)
app.get("/one-to-many",usrCtrl.oneToManyUser)
app.get("/many-to-many",usrCtrl.manyToManyUser)
app.get("/paranoid",usrCtrl.paranoid)



 app.listen(3000,()=>{
    console.log("app will run on http://localhost:3000")
 })