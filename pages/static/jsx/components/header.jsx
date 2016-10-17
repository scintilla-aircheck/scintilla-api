import React from 'react'

import DeploymentList from './deployments.jsx'

const Header = ({
    deployments,
    current_deployment,
    onDeploymentClick
}) => (
    <div className="header-container">
        <DeploymentList deployments={deployments} current_deployment={current_deployment} onDeploymentClick={onDeploymentClick} />
        <div></div>
    </div>
);

export default Header