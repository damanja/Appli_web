var datalayer = require('./datalayer.js');

const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var session = require('express-session')


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));


app.use(bodyParser.json());                             // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app.use(express.static(__dirname + '/public'));
datalayer.init(function(){
    console.log('init');
    app.listen(port);
    console.log("Listening on port " + port);
});

app.get("/", function(req, res) {
    res.sendFile('./public/login.html', { root: __dirname });
//    console.log("On est à la racine");
//    res.sendFile('./public/register.html');
});

//Send all tasks
app.get("/getTaskSet", function(req,res){
    datalayer.getTaskSet(function(dtSet){
        res.send(dtSet);
    });
});

app.post("/getUserTaskSet", function(req,res){
    var user = req.body.username;
    datalayer.getTaskUser(user, function(dtSet){
        res.send(dtSet);
    });
});

app.post("/insertTask", function(req, res){
    var task = {
        name : req.body.name,
        done : false
    };
    datalayer.insertTask(task,function(){
        datalayer.getTaskSet(function(dtSet){
            res.send(dtSet);
        });
    });
});

app.post("/addTask", function(req, res){
    var task = {
        name : req.body.name,
        done : false
    };
    datalayer.insertTask(task,function(){
        datalayer.getTaskSet(function(dtSet){
            res.send(dtSet);
        });
    });
});

app.put("/updateTaskDone/:liste_id", function(req, res) {
    var id = req.params.liste_id;
    datalayer.getOneTask(id, function(task){
        if(task.done==true) task.done=false;
        else task.done=true;
        datalayer.updateTask(id, task,function(){
            datalayer.getTaskSet(function(dtSet){
                res.send(dtSet);
            });
        });
    });
});

app.put("/updateTaskName/:liste_id", function(req, res) {
    var id = req.params.liste_id;
    var task = {
        name : req.body.name2
    };
      datalayer.updateTask(id, task,function(){
            datalayer.getTaskSet(function(dtSet){
                res.send(dtSet);
            });
        });
    });

app.delete("/deleteTask/:liste_id", function(req, res) {
    var id = req.params.liste_id;
    datalayer.deleteTask(id,function(){
        datalayer.getTaskSet(function(dtSet){
            res.send(dtSet);
        });
    //    res.send({success : true, });
    });
 });

 app.post("/createUser", function(req, res){
    var user = {
        username : req.body.username,
        pwd : req.body.pwd
    };
    datalayer.insertUser(user,function(result){
        if(result==null)
        {
            console.log("Utilisateur déjà pris");
            res.status(400).send({sucess : false});
        }
        else {
            res.send({success : true });
        }
    });
});

app.post("/checkUser", function(req,res){
    var user = {
        username : req.body.username,
        pwd : req.body.pwd
    };
    datalayer.checkUser(user,function(result){
        if(result==null)
            {
                console.log("Can't match username and password");
                res.status(400);
                res.send({success : false});
            }else{
                console.log("You are now logged in");
                res.send({success : true });
            }
    });
});