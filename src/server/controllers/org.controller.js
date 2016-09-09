var mongoose = require('mongoose');
var search = require('../services/search.service');
var Org = mongoose.model('Org', require('../models/org.schema'));

module.exports = {	
	getOrgs: function(req, res) {
		if (req.query.search) {
			var dbQuery = search(req.query.search, req.query.field);
		}
	  Org.find(dbQuery, (err, docs) => {
	    if(err) return console.error(err);
	    res.json(docs);
	  }).skip(+req.query.offset).limit(+req.query.limit);
	}
}