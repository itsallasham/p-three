var ctrl = require('../app_server/controllers/locations');

module.exports = function(app) {
	app.get('/', ctrl.home);
	app.get('', ctrl.home);
	app.get('/location/:locationid', ctrl.locationInfo);
	app.get('/location/review/new', ctrl.addReview);
}; 