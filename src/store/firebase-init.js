import config from './firebase-config.js'
import firebase from 'firebase'

firebase.initializeApp(config);

try {
  var messaging = firebase.messaging();
} catch (e) {
  console.log('Unable to Instantiate Firebase Messaing', e);
}

const database = firebase.database();
const auth = firebase.auth();

export {database, messaging, auth};
