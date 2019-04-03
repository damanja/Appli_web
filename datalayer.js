//Application qui fonctionne format web (pas forcément joli...)
//Déployer complètement sur le web (aws,heroku...)
//Git
//Création d'un compte utilisateur, connexion, déconnexion
//Création, modification, supression d'une tache
//Angular appelle serveur nodejs

//mlab

//Appels vers les structures de données partie business ne doit pas avoir de code par rapport à ça
// Sait où et comment sont stockées les données


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://admin:XJLTt9DWFwK0kNLO@cluster0-ibauf.mongodb.net/test?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser:true });
var db;

var datalayer = {
    init : function(cb){
        //Initialize connection once
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("Poly");
            cb();
        });
    },

    getTaskSet : function(cb){
        db.collection("task").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getOneTask : function(id,cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        db.collection("task").findOne(ident,function(err, task) {
            cb(task);
        });
    },
    
    insertTask : function(task, cb){
//        var task = {
 //           name : req.body.name,
 //           done : false
 //       };
        db.collection("task").insertOne(task, function() {
            cb();
        });
    },

    updateTask : function(id, task, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log(ident)
        db.collection("task").updateOne(ident, {$set: task}, function(err, result) {
        cb();
        });
    },

    deleteTask : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log(ident)
        db.collection("task").deleteOne(ident, function(err, result) {
        cb();
        });
    },

    insertUser: function(user,cb){
        db.collection("User").findOne({username: user.username},function(err,result){
            if(result==null)
                db.collection("User").insertOne(user, function() {
                  cb();
                });
            cb();
        });
        
    }
};

//module.exports(datalayer) --> datalayer
//module.exports=datalayer;
module.exports=datalayer;