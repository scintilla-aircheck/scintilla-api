import React from 'react'
import { Component } from 'react'

import DeploymentListContainer from '../containers/deployments'
import ReadingGraphListContainer from '../containers/readings'
import ReadingMapContainer from '../containers/readingMap'

class Root extends Component {

    render() {
        return(
            <div>
                <DeploymentListContainer />
                <ReadingMapContainer />
                <ReadingGraphListContainer />
            </div>
        )
    };
}

export default Root;
