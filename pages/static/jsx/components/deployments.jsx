import React from 'react'

class DeploymentList extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {dropDownOpen: false};
    }

    onClick() {
        this.setState({dropDownOpen: !this.state.dropDownOpen});
    }

    render() {
        let dropDownContainerClass = this.state.dropDownOpen ? 'deployments-list active' : 'deployments-list';

        return (
            <div className={dropDownContainerClass} onClick={this.onClick}>
                <span className="deployment-title">{this.props.current_deployment.name}</span>
                <ul className="dropdown">
                    {this.props.deployments.map(deployment =>
                        <Deployment
                            key={deployment.id}
                            {...deployment}
                            onClick={() => this.props.onDeploymentClick(deployment)}
                        />
                    )}
                </ul>
            </div>
        )
    }
}

DeploymentList.propTypes = {
    deployments: React.PropTypes.any.isRequired,
    onDeploymentClick: React.PropTypes.func.isRequired
};

const Deployment = ({
    onClick,
    name
}) => (
    <li className="deployment" onClick={onClick}>
        <a href="#">{name}</a>
    </li>
);

export default DeploymentList