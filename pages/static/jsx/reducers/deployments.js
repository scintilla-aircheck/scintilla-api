import { readings } from '../actions/readings'

import axios from 'axios'

const deployments = (state = {deployments:[], current_deployment: {}}, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'SELECT_DEPLOYMENT':
        //case 'SELECT_DEPLOYMENT_FULFILLED':

            console.log('./reducers/deployments.js:: SELECT_DEPLOYMENT:');
            console.log(action);

            readings(action.deployment.id);

            return {
                ...state,
                current_deployment: action.deployment
            };
        case 'DEPLOYMENTS_PENDING':
            return state;
        case 'DEPLOYMENTS_REJECTED':
            return state;
        case 'DEPLOYMENTS_FULFILLED':
            /*let current_deployment;
            if(action.payload.data.results.length > 0) {
                current_deployment = action.payload.data.results[0];
            } else {
                current_deployment = state.current_deployment;
            }

            console.log(current_deployment);
            */
            return {
                ...state,
                //current_deployment: current_deployment,
                deployments: action.payload.data.results
            };
        default:
            return state
    }
};

export default deployments