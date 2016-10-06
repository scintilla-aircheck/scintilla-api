import { connect } from 'react-redux'
import { selectDeployment } from '../actions/deployments'
import DeploymentList from '../components/deployments.jsx'

const mapStateToProps = (state) => ({
    deployments: state.deployments
});

const mapDispatchToProps =  ({
    onDeploymentClick: selectDeployment
});

const DeploymentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeploymentList);

export default DeploymentListContainer