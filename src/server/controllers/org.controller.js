const mongoose = require('mongoose');
const searchQuery = require('../services/search-query.service');
const Org = mongoose.model('Org', require('../models/org.schema'));

module.exports = {	
	getOrgs: function(req, res) {
		if (req.query.search) {
			var dbQuery = searchQuery(req.query.search, req.query.field);
		}
	  Org.find(dbQuery, (err, docs) => {
	    if(err) return console.error(err);
	    res.json(docs);
	  })
	  .sort("-stars")
	  .skip(+req.query.offset)
	  .limit(+req.query.limit);

	}
}