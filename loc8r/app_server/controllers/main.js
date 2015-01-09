

/*get about us page*/
module.exports.about = function(req, res) {
	res.render('about', {
		title: 'About us',
		pageHeader: {
			title: "About us",
			strapline: "gear or crank"
		}
	});
};
 
/*get signin page*/
module.exports.signin = function(req,res) {
	res.render('signin', {
		title: 'Sign In',
		pageHeader: {
			title: 'Sign in',
			strapline: 'yes...just log yourself...as in'
		}
	});
};
