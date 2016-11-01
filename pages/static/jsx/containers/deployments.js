import { connect } from 'react-redux'

import Header from '../components/header.jsx'

import { selectDeployment } from '../actions/deployments'
import { changeDate } from '../actions/readings'

const mapStateToProps = (state) => ({
    deployments: state.deployments.deployments,
    current_deployment: state.deployments.current_deployment,
    start_date: state.readings.start_date,
    end_date: state.readings.end_date
});

const mapDispatchToProps =  ({
    onDeploymentClick: selectDeployment,
    onDateChange: changeDate
});

const DeploymentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default DeploymentListContainer