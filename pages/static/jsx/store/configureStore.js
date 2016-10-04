/*if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod')
} else {
    module.exports = require('./configureStore.dev')
}
*/
import promise from 'redux-promise-middleware'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger';
import rootReducer from '../reducers'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(createLogger(), promise())
    )
  );

  return store
};

export default configureStore