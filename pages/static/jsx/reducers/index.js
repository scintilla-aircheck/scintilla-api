import { combineReducers } from 'redux'

import deployments from './deployments'
import readings from './readings'

const rootReducer = combineReducers({
    deployments,
    readings
});

export default rootReducer