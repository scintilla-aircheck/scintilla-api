import React from 'react'
import { Component } from 'react'

import DeploymentList from './deployments.jsx'
/*
var data = {
    deployments: [
        {
            id: 1,
            name: 'Power Plant'
        },
        {
            id: 2,
            name: 'Laser Factory'
        }
    ]
};
*/
class Root extends Component {

    componentWillMount() {
        const { store } = this.context;
        console.log('Root Component');
        console.log(store);
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { store } = this.context;
        const state = store.getState();
        console.log(state);

        return(
            <DeploymentList deployments={state.deployments}
                            onDeploymentClick={deployment =>
                            store.dispatch({
                                type: 'SELECT_DEPLOYMENT',
                                deployment
                            })
                        } />
        )
    };
}

Root.contextTypes = {
    store: React.PropTypes.object
};

export default Root;
