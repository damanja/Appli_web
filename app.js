

//var MongoClient = require('mongodb').MongoClient;

//var uri="mongodb+srv://mirana:mirana@cluster0-qp2kf.mongodb.net/Poly?retryWrites=true"
//var client = new MongoClient(uri, {useNewUrlParser: true});

// Initialize connection

//client.connect(function(err) {
//    if(err) throw err;

//    var dataSet = client.db("Poly").collection("Tasks").find({});

//    dataSet.forEach(function(task){
//        console.log(task.name + " | " + task.done);
//    });
//});


//datalayer.init --> app.js
// addTask puis datalayer.insertTask(task,function(){
//    res.send({success : true});
//}); --> app.js

//datalayer
var datalayer = require('./datalayer.js');


const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());                             // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app.use(express.static(__dirname + '/public'));
datalayer.init(function(){
    console.log('init');
    app.listen(3000);
    console.log("Listening on port 3000");
});

app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

//Send all tasks
app.get("/getTaskSet", function(req,res){
    datalayer.getTaskSet(function(dtSet){
        res.send(dtSet);
    });
});

app.put("/updateTaskName", function(req, res) {
    var id = req.body.id;
    var task = {
        name : req.body.name
    };
    datalayer.updateTask(id, task,function(){
        datalayer.getTaskSet(function(dtSet){
            res.send(dtSet);
        });
        //res.send({success : true, });
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
/* 
 //   var task = {
 //       done : (/^true$/i).test(req.body.done)
//  };
   // datalayer.updateTask(id, task,function(){
//        datalayer.getTaskSet(function(dtSet){
 //           res.send(dtSet);
   //     });
        // res.send({success : true, }); */
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
    datalayer.insertUser(user,function(){
        res.send({success : true, });
    });
});