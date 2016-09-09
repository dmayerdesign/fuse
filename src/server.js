var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var search = require('./backend-services/search.service');
var mongoose = require('mongoose');
var db;

var app = express();
app.set('port', (process.env.PORT || 4000));

app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
app.use('/bundle', express.static(__dirname + '/bundle'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/fuse');
db = mongoose.connection;
mongoose.Promise = global.Promise;



var catSchema = mongoose.Schema({
    name: String,
    weight: Number,
    age: Number
});

var Cat = mongoose.model('Cat', catSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    // select all
    app.get('/cats', function(req, res) {
        var limit = parseInt(req.query.show, 10) || 0;
        var offset = parseInt(req.query.offset, 10) || 0;

        Cat.find({}, function(err, docs) {
            if(err) return console.error(err);
            res.json(docs);
        }).skip(offset).limit(limit);
    });

    // find by search
    app.get('/cats/get', function(req, res) {
        var query = search(req.query); // limit, offset, search, field
        Cat.find(query, (err, docs) => {
            if(err) return console.error(err);
            res.json(docs);
        }).skip(+query.offset).limit(+query.limit);
    });

    // count all
    app.get('/cats/count', function(req, res) {
        Cat.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/cat', function(req, res) {
        var obj = new Cat(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/cat/:id', function(req, res) {
        Cat.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/cat/:id', function(req, res) {
        Cat.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/cat/:id', function(req, res) {
        Cat.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });


    // all other routes are handled by Angular
    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port ' + app.get('port'));
    });
});


