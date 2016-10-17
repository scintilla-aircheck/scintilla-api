import React from 'react'

class DeploymentList extends React.Component {
    constructor(props) {
        super(props);
        //this.onClick = this.onClick.bind(this);
        //this.state = {dropDownOpen: false};
    }

    render() {
        return (
            <div className="deployments_list">
                <span>{this.props.current_deployment.name}</span>
                {this.props.deployments.map(deployment =>
                    <Deployment
                        key={deployment.id}
                        {...deployment}
                        onClick={() => this.props.onDeploymentClick(deployment)}
                    />
                )}
            </div>
        )
    }
}

DeploymentList.propTypes = {
    deployments: React.PropTypes.any.isRequired,
    onDeploymentClick: React.PropTypes.func.isRequired
};

/*
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
*/
/*class Deployment extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {dropDownOpen: false};
    }

    onClick(event) {
        this.setState({dropDownOpen: !this.state.dropDownOpen});
        this.props.onClick();
    }

    render() {
        let dropDownContainerClass = this.state.dropDownOpen ? 'drop_down_container active' : 'drop_down_container';
        return (
            <div className={dropDownContainerClass} onClick={this.onClick}>
                {this.props.name}
            </div>
        )
    }
}

Deployment.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired
};*/


const Deployment = ({
    onClick,
    name
}) => (
    <div className="deployment" onClick={onClick}>
        {name}
    </div>
);

export default DeploymentList