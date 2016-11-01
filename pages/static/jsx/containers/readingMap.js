import { connect } from 'react-redux'

import ReadingMap from '../components/readingMap.jsx'

const mapStateToProps = (state) => ({
    readings: state.readings
});

const ReadingMapContainer = connect(
    mapStateToProps,
    null
)(ReadingMap);

export default ReadingMapContainer
