import { addReading } from '../actions/readings'

import axios from 'axios'

const deployments = (state = {deployments:[], current_deployment: {}, socket: null}, action) => {

    switch (action.type) {
        case 'SELECT_DEPLOYMENT':
            console.log('./reducers/deployments.js:: SELECT_DEPLOYMENT:');
            console.log(action);

            return {
                ...state,
                current_deployment: action.deployment
            };
        case 'DEPLOYMENTS_PENDING':
            return state;
        case 'DEPLOYMENTS_REJECTED':
            return state;
        case 'DEPLOYMENTS_FULFILLED':

            return {
                ...state,
                deployments: action.payload.data.results
            };
        case 'CREATE_SOCKET':
            console.log('./reducers/deployments.js:: CREATE_SOCKET:');
            console.log(action.socket);
            if( state.socket ) {
                state.socket.onclose = function () {}; // disable onclose handler first
                state.socket.close();
            }
            var socket = action.socket();
            return {
                ...state,
                socket
            };
        default:
            return state
    }
};

export default deployments