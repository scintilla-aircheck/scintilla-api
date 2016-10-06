import React from 'react'
import { Component } from 'react'

import DeploymentListContainer from '../containers/deployments'
import ReadingGraphListContainer from '../containers/readings'

class Root extends Component {

    render() {
        return(
            <div>
                <DeploymentListContainer />
                <ReadingGraphListContainer />
            </div>
        )
    };
}

export default Root;
