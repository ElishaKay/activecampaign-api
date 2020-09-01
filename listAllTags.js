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




// contactTags('-1').then((response)=>{
// 	console.log('get Tags response')
// })
//    