import { connect } from 'react-redux'
import ReadingGraphList from '../components/readingGraph.jsx'

const mapStateToProps = (state) => ({
    readings: state.readings
});

const ReadingGraphListContainer = connect(
    mapStateToProps,
    null
)(ReadingGraphList);

export default ReadingGraphListContainer