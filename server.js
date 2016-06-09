
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

//Serving static files in public folder
app.use(express.static(__dirname + '/public'));

//For parsing form inputs
app.use(bodyParser.json());

//express request to handle GET request [for displaying all the documents]
app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//express request to handle POST request [to insert new document]
app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

//express request to handle DELETE request [to delete a document]
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id:  mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//express request to handle GET request [to search a document]
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log('hihihi');
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//express request to handle PUT request [to update a document]
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");