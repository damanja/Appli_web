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
        //console.log("id= " + id);
        var ident = {
            _id : new ObjectID(id)
        };
        //console.log(ident);
        db.collection("task").findOne(ident,function(err, task) {
            cb(task);
        });
    },
    insertTask : function(task, cb){
        db.collection("task").insertOne(task, function() {
            cb();
        });
    },

    updateTask : function(id, task, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        db.collection("task").updateOne(ident, {$set: task}, function(err, result) {
        cb();
        });
    },

    deleteTask : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
      //  console.log(ident)
        db.collection("task").deleteOne(ident, function(err, result) {
        cb();
        });
    },

    insertUser: function(user,cb){
        db.collection("User").findOne({username: user.username},function(err,result){
            if(result==null){
//                console.log("Pas encore d'utilisateur avec ce nom");
                db.collection("User").insertOne(user, function(err, utilisateur) {

                    cb(utilisateur);
                });
            }else{
//                console.log("utilisateur pris");
                cb(null);
            }
//            cb();
        });
        
    },
    checkUser: function(user, cb){
        db.collection("User").findOne({username: user.username, pwd: user.pwd},function(err,result){
            if(result==null){
                console.log("wrong username/password");
                cb(null);
            }else{
              //  if(result.pwd==pwd) 
                console.log("Hello " + result.username)
                cb(result);
//                else {
//                   console.log("Wrong password");
//                  cb(null);
//             }
            }
//          cb();
        });  
    },  
    getTaskUser: function(user,cb){
        db.collection("task").find({owner: user}).toArray(function(err, docs) {
            cb(docs);
        });
    },    
    
    getListTask : function(cb){
        db.collection("task").distinct("list", function(err,docs){
            cb(docs);
        });
    }
};

//module.exports(datalayer) --> datalayer
//module.exports=datalayer;
module.exports=datalayer;