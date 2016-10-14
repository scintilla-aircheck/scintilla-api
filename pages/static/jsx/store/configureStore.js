import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import throttle from 'lodash/throttle'

import rootReducer from '../reducers'

import { loadState, saveState } from './localStorage'

const configureStore = () => {
    //const persistantState = loadState();
    const persistantState = {};  // TODO turn persistant storage back on!

    const store = createStore(
        rootReducer,
        persistantState,
        compose(
            applyMiddleware(thunk, createLogger(), promise())
        )
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }, 1000));

    return store;
};

export default configureStore