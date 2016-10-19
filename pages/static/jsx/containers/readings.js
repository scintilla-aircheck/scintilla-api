import { connect } from 'react-redux'

import ReadingGraphList from '../components/readingGraph.jsx'

import { toggleDeviceActive, toggleSensorTypeActive } from '../actions/readings'

const mapStateToProps = (state) => ({
    readings: state.readings
});

const mapDispatchToProps =  ({
    toggleDeviceActive: toggleDeviceActive,
    toggleSensorTypeActive: toggleSensorTypeActive

});

const ReadingGraphListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadingGraphList);

export default ReadingGraphListContainer