var datalayer = require('./datalayer.js');

const express = require('express');
const app = express();

var session = require('express-session');

const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var session = require('express-session')

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
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
    req.session.user = null;
    console.log("the user = " + req.session.user);

    res.sendFile('./public/login.html', { root: __dirname });
//    console.log("On est à la racine");
//    res.sendFile('./public/register.html');
});

//Send all tasks
app.get("/getTaskSet", function(req,res){
    console.log(req.session.user);
    datalayer.getTaskSet(function(dtSet){
        res.send(dtSet);
    });
});
/*
app.post("/getUserTaskSet", function(req,res){
//    var user = req.body.username;
//    console.log("the user connected is " + req.session.user);    
    var user = req.session.user;
    datalayer.getTaskUser(user, function(dtSet){
        res.send(dtSet);
    });
});
*/
app.post("/insertTask/:name_list", function(req, res){
    var task = {
        name : req.body.name,
        done : false,
        list : req.params.name_list,
        owner : req.session.user
    };
    datalayer.insertTask(task,function(){
        var user = req.session.user;
        datalayer.getAllTask(user, function(dtSet){
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
        datalayer.getTaskUser(function(dtSet){
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
            var user = req.session.user;
            datalayer.getAllTask(user, function(dtSet){
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
            var user = req.session.user;
            datalayer.getAllTask(user, function(dtSet){
                res.send(dtSet);
            });
        });
    });

app.delete("/deleteTask/:liste_id", function(req, res) {
    var id = req.params.liste_id;
    datalayer.deleteTask(id,function(){
        var user =req.session.user;
        datalayer.getAllTask(user, function(dtSet){
            res.send(dtSet);
        });
    //    res.send({success : true, });
    });
 });

app.delete("/deleteListTask/:id", function(req,res){
    var id= req.params.id;
    datalayer.getOneList(id,function(list){
        var nameListe=list.name;
        datalayer.deleteList(id, function(){ //on va supprimer la liste d'abord
            datalayer.deleteTaskFromList(nameListe, function(){ //on supprime tous les taches a l'interieur
                var user = req.session.user;
                datalayer.getAllTask(user, function(dtSet){
                    res.send(dtSet);
                });
            });
        });
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
                req.session.user = user.username;
                console.log("You are now logged in");
                res.send({success : true });
            }
    });
});


app.post("/getListAllTask", function(req,res){
    var user =  req.session.user;
    datalayer.getListTask(user, function(liste){
        res.send(liste);
    });
});

//chercher les taches a l'intérieur d'une liste
app.post("/getTaskList", function(req,res){
    var user = req.session.user;
    var list = req.body.liste;
    datalayer.getTasks(user, list,function(data){
        res.send(data);
    });
});

app.post("/getUserTaskSet", function(req,res){
    var user = req.session.user;
    datalayer.getAllTask(user, function(data){
        res.send(data);
    });
});

app.post("/insertListTask", function(req,res){
    var list = {
        name : req.body.name,
        owner : req.session.user
    };
    datalayer.insertList(list,function(){
        var user = req.session.user;
        datalayer.getAllTask(user, function(dtSet){
            res.send(dtSet);
        });
    });
});