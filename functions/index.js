const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser')();
admin.initializeApp();

const app = express();

const key = functions.config().server.key

app.use(cors({ origin: true }));

const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    return res.status(403).json({status: 'Unauthorized', reason: 'No Firebase ID token was passed as a Bearer token in the Authorization header'});
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    return res.status(403).json({status: 'Unauthorized', reason: 'No Cookie'});
  }
  admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    return next();
  }).catch((error) => {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(403).json({status: 'Unauthorized', reason: 'Error while verifying Firebase ID token'});
  });
};

function registerDevice(req, res) {
  const token = req.body.token
  const topic = req.body.topic
  const url = "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic;
  fetch(url,
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer key=' + key
    }
  })
  .then(resp => resp.json())
  .then((resp) => res.json({ success: true, response: resp }))
  .catch(error => res.json({ success: false, error: true }))
}

function postNotification(req, res) {

  const title = req.body.title;
  const body = req.body.body;
  const icon = req.body.icon;
  const link = req.body.link;

  const content = {
    notification: {
      title, body, icon,
      click_action: link
    },
    to : "/topics/innovation5"
  }

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + key
    },
    body: JSON.stringify(content)
  })
  .then(resp => {
    return res.json(resp)
  })
  .then(resp => {
    return res.json({success: true, response: resp})
  })
  .catch(error => {
    console.log("error",error)
    return res.json({success: false, error: error})
  })
}

// Add middleware to authenticate requests
app.post('/registerDevice', (req, res) => registerDevice(req, res));

app.use(validateFirebaseIdToken);

app.post('/postNotification', (req, res) => postNotification(req, res));

// Expose Express API as a single Cloud Function:
exports.notification = functions.https.onRequest(app);
