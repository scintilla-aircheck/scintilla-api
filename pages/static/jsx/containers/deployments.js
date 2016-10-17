import { connect } from 'react-redux'
import { selectDeployment } from '../actions/deployments'
import DeploymentList from '../components/deployments.jsx'

const mapStateToProps = (state) => ({
    deployments: state.deployments.deployments,
    current_deployment: state.deployments.current_deployment
});

const mapDispatchToProps =  ({
    onDeploymentClick: selectDeployment
});

const DeploymentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeploymentList);

export default DeploymentListContainer