import React from 'react'

class ReadingMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map: null};
    }

    componentDidMount() {
        this.state.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: {lat: -33.865427, lng: 151.196123},
            mapTypeId: 'terrain'
        });
        function eqfeed_callback(results) {
            var heatmapData = [];
            for (var i = 0; i < results.features.length; i++) {
                var coords = results.features[i].geometry.coordinates;
                var latLng = new window.google.maps.LatLng(coords[1], coords[0]);
                var magnitude = results.features[i].properties.mag;
                var weightedLoc = {
                    location: latLng,
                    weight: Math.pow(2, magnitude)
                };
                heatmapData.push(weightedLoc);
            }
            var heatmap = new window.google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                dissipating: false,
                map: map
            });
        }
    }

    render() {
        console.log('./components/readingMap.jsx:: ReadingMap: RENDER');
        return (
            <div id="map">

            </div>
        )
    }
}

ReadingMap.propTypes = {
    readings: React.PropTypes.any.isRequired
};

export default ReadingMap
