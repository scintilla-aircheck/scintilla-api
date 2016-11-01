import { addReading, readings } from './readings'

import axios from 'axios'

function socketFactory(dispatch, deployment_id) {
    return () => {
        var socket = new WebSocket('ws://' + window.location.host + '/socket/deployment/' + String(deployment_id));
        if (socket) {
            socket.onmessage = function (e) {
                console.log('./index.jsx:: SOCKET ONMESSAGE:');
                console.log(e.data);
                dispatch(addReading(JSON.parse(e.data)));
            };
            // When the backend reloads, the connection will be lost.
            // This will reopen it after a bit of a cooldown period.
            socket.onclose = function (e) {
                if (e.code === 1006) {
                    window.setTimeout(() => {
                        createSocket(deployment_id);
                    }, 1500);
                }
            };
        }

        return socket;
    }
}

export const createSocket = (deployment_id) => {
    return dispatch => {
        console.log('./actions/deployments.js:: CREATE SOCKET:');
        console.log(deployment_id);
        return dispatch({type: 'CREATE_SOCKET', socket: socketFactory(dispatch, deployment_id)});
    };
};

export const deployments = () => {
    return dispatch => {

        return dispatch({
            type: 'DEPLOYMENTS',
            payload: axios.get('http://' + window.location.host + '/api/v1/deployments/')
        }).then((response) => {
            if( response.value.data.results.length ) {
                console.log('./actions/deployments.js:: DISPATCHING SELECT DEPLOYMENT:');
                console.log(response.value.data.results[0]);
                return dispatch(selectDeployment(response.value.data.results[0]));
            } else {
                return null;
            }
        })
    }
};

export const selectDeployment = (deployment) => {
    return dispatch => {
        dispatch({type: 'SELECT_DEPLOYMENT', deployment});

        dispatch(readings(deployment.id));

        dispatch(createSocket(deployment.id));
    };
};

/*
export const selectDeployment = (deployment) => {
    return dispatch => {

        console.log('./actions/deployments.js:: SELECT DEPLOYMENT ACTION:');
        console.log(deployment);

        return dispatch({
            type: 'SELECT_DEPLOYMENT',
            deployment: deployment,
            payload: new Promise(resolve => {
                resolve(deployment.id); // resolve the promise with the value 'foo'
            })
        }).then((response) => {
            console.log('./actions/deployments.js:: THEN AFTER SELECT DEPLOYMENT');
            console.log(response);

            return dispatch(readings(response.value));
        })
    }
};*/