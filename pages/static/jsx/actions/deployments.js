import { readings } from './readings'

import axios from 'axios'

export const deployments = () => {
    return dispatch => {

        return dispatch({
            type: 'DEPLOYMENTS',
            payload: axios.get('http://localhost:8000/api/v1/deployments/')
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