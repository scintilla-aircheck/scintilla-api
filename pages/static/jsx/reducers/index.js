import { combineReducers } from 'redux'
import deployments from './deployments'


const rootReducer = combineReducers({
    deployments
});

export default rootReducer