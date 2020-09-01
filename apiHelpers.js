const request = require('request');
const express = require('express')
const app = express()
const port = 3001

app.get('/', async (req, res) => {
    const response = await userByEmail('youremailtotest@test.com');
    res.send(response);
});

app.get('/tags', async (req, res) => {
    //replace -1 with the contactid to find the tags associated with them
    const response = await contactTags('-1');
    res.send(response);
});

app.get('/listadd', async (req, res) => {
    //replace -1 with the contactid
    const response = await examListManage(-1,true);
    res.send(response);
});

//environment variables need to be set to your API key and url root
const requestOptions = (method) => {
    return  { 
        method: method,
    headers: {
        "Api-Token" : process.env.ACTIVE_CAMPAIGN_KEY
    },
    url: `https://${process.env.ACTIVE_CAMPAIGN_URLROOT}/api/3/` };
}

async function examListManage(contactId, subscribe) {
    let options = requestOptions('POST');
    //replace -1 with the listid you want to add to
    let listObject = listManage(contactId,-1,subscribe);
    options.url = `${options.url}contactLists`;
    options['json'] = true;
    options['body'] = listObject;

    return new Promise(function(resolve, reject) {
            // Do async job
            request.post(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

async function contactTags(contactId) {
    let options = requestOptions('GET');
    options.url = `${options.url}contacts/${contactId}/contactTags`;

    return new Promise(function(resolve, reject) {
            // Do async job
            request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

async function allTags() {
    let options = requestOptions('GET');
    options.url = `${options.url}tags`;

    return new Promise(function(resolve, reject) {
            // Do async job
            request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

async function tagContactAdd(contactId, tagName) {
    let options = requestOptions('POST');
    let tags = tags();
    let tagObject = tagContactAdd(contactId, tags[tagName]);
    options.url = `${options.url}contactTags`;
    options['json'] = true;
    options['body'] = tagObject;

    return new Promise(function(resolve, reject) {
        // Do async job
        request.post(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

async function userCreate(firstName, lastName, email, phone) {
    let options = requestOptions('POST');
    let userObject = contactObject(firstName, lastName, email, phone);
    options.url = `${options.url}contacts`;
    options['json'] = true;
    options['body'] = userObject;

    return new Promise(function(resolve, reject) {
            // Do async job
            request.post(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    });
}

async function userByEmail(emailAddress) {     
    let options = requestOptions('GET');
    options.url = `${options.url}contacts?email=${emailAddress}`;

    // Return new promise
    return new Promise(function(resolve, reject) {
            // Do async job
            request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(parseUserResponse(body));
            }
        })
    });
}

const parseUserResponse = (body) => {
    const bodyObject = JSON.parse(body);
    if (bodyObject.contacts.length > 0)
        return {email: bodyObject.contacts[0].email, id: bodyObject.contacts[0].id};
    else
        return null;
}

const contactObject = (firstName, lastName, email, phone) => {
    return {
        "contact": {
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone
        }
    }
}

const listManage = (contactId, listId, status) => {
    return {
        "contactList": {
            "list": listId,
            "contact": contactId,
            "status": status
        }
    }
}

const tagContact = (contactId, tagId) => {
    return {
        "contactTag": {
            "contact": contactId,
            "tag": tagId
        }
    }
}

//replace the ids names of your tags here
const tags = () => {
    return {
        "na" : -1,
        "na" : -1,
        "na" : -1,
        "na" : -1
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))