var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db;
var app = express();

// Models
var Org = mongoose.model('Org', require('./server/models/org.schema'));

// Controllers
var orgCtrl = require('./server/controllers/org.controller');

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


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');

    // find by search
    app.get('/orgs/get', orgCtrl.getOrgs);

    // count all
    app.get('/orgs/count', function(req, res) {
        Org.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
    app.post('/org', function(req, res) {
        var obj = new Org(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });

    // find by id
    app.get('/org/:id', function(req, res) {
        Org.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
    });

    // update by id
    app.put('/org/:id', function(req, res) {
        Org.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    // delete by id
    app.delete('/org/:id', function(req, res) {
        Org.findOneAndRemove({_id: req.params.id}, function(err) {
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


