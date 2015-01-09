module.exports = function(app) {
	require('./main')(app);
	require('./locations')(app);
};

console.log('in index.js');