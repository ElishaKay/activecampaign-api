require('dotenv').config();
const request = require('request');
var ActiveCampaign = require("activecampaign");

const ac = new ActiveCampaign(process.env.HOST, process.env.KEY);

//environment variables need to be set to your API key and url root
const requestOptions = (method) => {
    return  { 
        method: method,
    headers: {
        "Api-Token" : process.env.KEY
    },
    url: `${process.env.HOST}/api/3/` };
}

async function allTags() {
    let options = requestOptions('GET');
    options.url = `${options.url}tags`;

    request.get(options, function(err, resp, body) {
            if (err) {
                console.log('err',err)
            } else {
                console.log('body',body)
            }
    })
}


allTags();	

let email = 'alephmarketingpros@gmail.com';
var contact_add = ac.api("contact/add", {email});

contact_add.then(function(result) {
	console.log('succesfully added contact',result);

	var eventdata = {
	    tags: 'installed-social-king',
	    email
	};

	ac.api('contact/tag/add', eventdata).then(function(result) {
	    console.log('success', result);
	}, function(err) {
	    console.log('failure', err);
	});     
}, function(result) {
	console.log(result);
});






// contactTags('-1').then((response)=>{
// 	console.log('get Tags response')
// })
//    