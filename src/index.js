import React from 'react';
import ReactDOM from 'react-dom';   
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import {composeWithDevTools} from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyAqshYs6pTEXQuQGPcBmXmFNkHLf-zqai8",
  authDomain: "bootcamp-92234.firebaseapp.com",
  databaseURL: "https://bootcamp-92234-default-rtdb.firebaseio.com",
  projectId: "bootcamp-92234",
  storageBucket: "bootcamp-92234.appspot.com",
  messagingSenderId: "327812740359",
  appId: "1:327812740359:web:bcdc2cefb5df8755de41a2"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);