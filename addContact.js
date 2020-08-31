var ActiveCampaign = require("activecampaign");

var ac = new ActiveCampaign(process.env.HOST, process.env.KEY);

var user = {
	email: 'john@example.com'
}

var contact = {
	'email': user.email,
	'p[2]': 2,
	'status[2]': 1,
};

var contact_add = ac.api("contact/add", contact);

contact_add.then(function(result) {
	console.log(result);
}, function(result) {
	console.log(result);
});