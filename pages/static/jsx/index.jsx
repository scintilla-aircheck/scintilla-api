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

export const store = configureStore();
window.store = store; // for debugging

render(
    <Provider store={store}>
        <Root />
    </Provider>,
  document.getElementById('root')
);

store.dispatch(deployments());
