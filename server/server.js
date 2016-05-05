/**
 * Created by josephstarustka on 5/3/16.
 */
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/gditdb');

var schema = new Schema(
    {
        firstName: String,
        lastName: String,
        middleInitial: String,
        emailAddress: String,
        phoneNumber: String,
        position: String,
        dateHired: String,
        addressLineOne: String,
        addressLineTwo: String,
        city: String,
        state: String,
        zip: String,
        active: Boolean
    }
);
var Person = mongoose.model('Person', schema);

app.get("/", function(req, res){
    Person.find(function (err, details) {
        res.send(details);
    });
});

app.get("/find", function(req, res) {
    Person.findById(req.query.id, function(err, person) {
        if(err) throw error;
        res.send(person);
    })
})

app.post("/add", function (req, res) {
    var person = new Person(req.body);
    person.save(function (err) {
        if(err) throw err;
        res.send();
    });
});

app.put("/update", function (req, res) {
    Person.findByIdAndUpdate(req.query.id, req.body, function(err) {
       if(err) throw error;
        res.send();
    });
});

app.delete("/delete", function (req, res) {
    Person.findByIdAndRemove(req.query.id, function (err) {
        if(err) throw err;
        res.send();
    })
});

app.listen(3000);