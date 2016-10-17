import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { deployments } from './actions/deployments'
import { addReading } from './actions/readings'

import 'babel-polyfill';

import Root from './containers/root.jsx'
import configureStore from './store/configureStore'

document.getElementById('loading').style.display = 'none';

const store = configureStore();

render(
    <Provider store={store}>
        <Root />
    </Provider>,
  document.getElementById('root')
);

store.dispatch(deployments());

var socket = null;
function createSocket() {
    socket = new WebSocket('ws://' + window.location.host + '/socket');
    if (socket) {
        socket.onmessage = function(e) {
            console.log('./index.jsx:: SOCKET ONMESSAGE:');
            console.log(e.data);
            store.dispatch(addReading(JSON.parse(e.data)));
            //store.dispatch({
            //    type: 'ADD_READING',
            //    reading: JSON.parse(e.data)
            //})
        };
        // When the backend reloads, the connection will be lost.
        // This will reopen it after a bit of a cooldown period.
        socket.onclose = function(e) {
            if (e.code === 1006) {
                window.setTimeout(createSocket, 2000);
            }
        };
    }
}
createSocket();
