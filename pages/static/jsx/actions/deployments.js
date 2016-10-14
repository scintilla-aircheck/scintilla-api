import { readings } from './readings'

import axios from 'axios'

export const deployments = () => {
    return dispatch => {

        return dispatch({
            type: 'DEPLOYMENTS',
            payload: axios.get('http://localhost:8000/api/v1/deployments/')
        }).then((response) => {
            if( response.value.data.results.length ) {
                return dispatch(selectDeployment(response.value.data.results[0]));
            } else {
                return null;
            }
        })
    }
};

export const selectDeployment = (deployment) => {
    return dispatch => {

        return dispatch({
            type: 'SELECT_DEPLOYMENT',
            deployment,
            payload: new Promise(resolve => {
                resolve(deployment.id); // resolve the promise with the value 'foo'
            })
        }).then((response) => {
            return dispatch(readings(response.value));
        })
    }
};