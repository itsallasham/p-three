var request = require('request');
var apiOptions = {
	server: "http://localhost:4000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "http://mysterious-harbor-6340.herokuapp.com/"
};
var renderDetailPage = function(req, res, locDetail) {
	res.render('location', {
		title: locDetail.name,
		pageHeader: {
			title: locDetail.name,
			strapline: 'Does it suck?'
		},
		sidebar: {
			context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
			callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
		},
		location: locDetail
	});
}

var renderHomepage = function(req, res, responseBody) {
	var message;
	if(!(responseBody instanceof Array)) {
		message = "API lookup error";
		responseBody = [];
	} else {
		if(!responseBody.length) {
			message = "No places found nearby";
		}
	}
	res.render('locations-list', {
		title: 'Piece-IIV - Drop and Go',
		pageHeader: {
			title: 'Piece-IIV',
			strapline: 'Drop and Go!'
		},
		sidebar: "Come and check out all these places",
		locations: responseBody,	
		message: message
	});
};

var _formatDistance = function (distance) {
	var numDistance, unit;
	if (distance > 1) {
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'm'
	}
	return numDistance + unit;
}
/*get home page*/
module.exports.home = function(req,res) {
	var requestOptions, path;
	path = '/api/locations';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {
			lng : -0.7992599,
			lat : 51.378091, 
			maxDistance: 30
		}
	};
	request (
		requestOptions,
		function(err, response, body) {
			var i , data;
			data = body;
			if(response.statusCode === 200 && data.length) {
				for (i=0; i < data.length; i++) {
					data[i].distance = _formatDistance(data[i].distance);
				}
			}
			renderHomepage(req, res, data);
		});
	
};

/*get location info page*/
module.exports.locationInfo = function(req,res) {
	var requestOptions, path;
	path = '/api/locations/' + req.params.locationid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			var data = body;
			data.coords = {
				lng : body.coords[0],
				lat : body.coords[1]
			};
			renderDetailPage(req, res, data);
		});
};

 
/*get add review page*/
module.exports.addReview = function(req, res) {
	res.render('addReview', {
		title: 'Add Review',
		pageHeader: {
			title: 'Add review',
			strapline: 'Share your experience with the world'
		},
		locations: [{
			name: 'Starcups',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'Premium wifi'],
			distance: '100m'
		}]
	});
};