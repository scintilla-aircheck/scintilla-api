import React from 'react'

const DeploymentList = ({
    deployments,
    onDeploymentClick
}) => (
    <div className="deployments_list">
        {deployments.deployments.map(deployment =>
            <Deployment
                key={deployment.id}
                {...deployment}
                onClick={() => onDeploymentClick(deployment)}
            />
        )}
    </div>
);

const Deployment = ({
    onClick,
    name
}) => (
    <div className="deployment" onClick={onClick}>
        {name}
    </div>
);

export default DeploymentList