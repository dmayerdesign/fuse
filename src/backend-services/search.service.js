module.exports = function(req_query) {
	var limit = parseInt(req_query.show, 10) || 0;
  var offset = parseInt(req_query.offset, 10) || 0;
  var search = req_query.search;
  var field = req_query.field || "name";
  var query = {};
  if (typeof search === "string" && search.length) {
      query[field] = { "$regex": search, "$options": "i" };
  }
  return query;
}