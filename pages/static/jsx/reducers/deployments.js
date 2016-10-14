import { selectDeployment } from '../actions/deployments'
import { readings } from './readings'

import axios from 'axios'

const deployments = (state = {deployments:[]}, action) => {
    switch (action.type) {
        case 'SELECT_DEPLOYMENT':

            return {
                ...state,
                current_deployment: action.deployment
            };
        case 'DEPLOYMENTS_PENDING':
            return state;
        case 'DEPLOYMENTS_REJECTED':
            return state;
        case 'DEPLOYMENTS_FULFILLED':
            let current_deployment;
            if(state.current_deployment === undefined &&
               action.payload.data.results.length > 0) {
                current_deployment = action.payload.data.results[0];
            } else {
                current_deployment = state.current_deployment;
            }

            return {
                ...state,
                deployments: action.payload.data.results
            };
        default:
            return state
    }
};

export default deployments