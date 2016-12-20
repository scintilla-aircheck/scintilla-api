import React from 'react'

function createHeatmap(map, heatmap, markers, device_ids, heatmap_readings_table, heatmap_date) {
    console.log('./components/readingMap.jsx:: CREATE HEATMAP: ');
    console.log(heatmap_readings_table);

    //clear markers
    for(var m = 0; m < markers.length; m++) {
        markers[m].setMap(null);
    }
    markers.length = 0; // keep this.state.markers reference intact for use later in this function

    var bounds = new google.maps.LatLngBounds();

    try {
        var heatmap_data = [];
        var x_total = 0.0;
        var y_total = 0.0;
        var z_total = 0.0;

        for (var i = 0; i < device_ids.length; i++) {
            var pivot;
            var bottom_index = 0;
            var top_index = heatmap_readings_table[i].length - 1;
            for (var j = 0; j < Math.floor(Math.log2(heatmap_readings_table[i].length)) + 1; j++) {
                pivot = Math.floor((top_index + bottom_index) / 2);

                if (heatmap_date > heatmap_readings_table[i][pivot][0]) {
                    bottom_index = pivot + 1;
                } else {
                    top_index = pivot;
                }
            }

            var latitude = heatmap_readings_table[i][pivot][1];
            var longitude = heatmap_readings_table[i][pivot][2];
            var phi = -(latitude - 90.0) * Math.PI / 180.0;
            var theta = (longitude + 180.0) * Math.PI / 180.0;
            x_total += Math.sin(phi) * Math.cos(theta);
            y_total += Math.sin(phi) * Math.sin(theta);
            z_total += Math.cos(phi);

            var latLng = new google.maps.LatLng(latitude, longitude);
            var magnitude = heatmap_readings_table[i][pivot][3] / 100.0;
            var weightedLoc = {
                location: latLng,
                weight: magnitude
            };
            heatmap_data.push(weightedLoc);

            let infowindow = new google.maps.InfoWindow({
                content: '<div>' + String(device_ids[i]) + '</div>'
            });
            let marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: String(device_ids[i]),
                label: {text: 'test2'},
                opacity: 0.7
            });

            markers.push(marker);
            bounds.extend(marker.getPosition());
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }

        var length = Math.sqrt(Math.pow(x_total, 2) + Math.pow(y_total, 2) + Math.pow(z_total, 2));
        var x_total_normalized = x_total / length;
        var y_total_normalized = y_total / length;
        var z_total_normalized = z_total / length;

        var center_longitude = (Math.atan(y_total_normalized / x_total_normalized) * 180.0 / Math.PI) - 180.0;
        var center_latitude = -(Math.atan(Math.sqrt(Math.pow(x_total_normalized, 2) + Math.pow(y_total_normalized, 2)) / z_total_normalized) * 180.0 / Math.PI) + 90.0;

        map.setCenter(new google.maps.LatLng(center_latitude, center_longitude));

        map.fitBounds(bounds);

        heatmap.setData(heatmap_data);

    } catch(e) {
        console.log(e);
    }
}

class ReadingMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {map: null, heatmap: null, markers: [], queued_update_count: 0, last_update_time: null};
    }

    shouldComponentUpdate(nextProps, nextState) {
        const graph_render_wait_time = 500;  // ms
        // rate limit updates

        // prevent continuous updates from locking up semaphore check
        var now = new Date();
        var offset_time = new Date(now.getTime() - graph_render_wait_time);  // 500ms in the past

        if(this.state.last_update_time === null || this.state.last_update_time < offset_time) {
            this.state.last_update_time = now;
            return true;
        }

        // check using semaphore
        this.state.queued_update_count += 1;

        var that = this;
        window.setTimeout(() => {
            var now = new Date();
            that.state.queued_update_count -= 1;
            if(that.state.queued_update_count <= 0) {
                that.state.last_update_time = now;
                that.forceUpdate();
            }
        }, graph_render_wait_time);

        return false;
    }

    componentDidMount() {
        console.log('./components/readingMap.jsx:: COMPONENT DID MOUNT: ');
        console.log(this.props.readings.heatmap_latitude);
        console.log(this.props.readings.heatmap_longitude);
        this.state.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 0.0, lng: 0.0},
            mapTypeId: 'terrain'
        });
        this.state.heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: [],
            dissipating: false,
            //maxIntensity: 10,
            radius: .01,
            //opacity: 0.9,
            map: this.state.map
        });

        if(this.props.readings.sensor_type_view_graphs.length) {
            var heatmap_active_sensor_type_index = this.props.readings.heatmap_active_sensor_type_index > -1 ? this.props.readings.heatmap_active_sensor_type_index : 0;

            createHeatmap(this.state.map, this.state.heatmap, this.state.markers, this.props.readings.device_ids, this.props.readings.heatmap_readings_table[heatmap_active_sensor_type_index], this.props.readings.heatmap_date);
        }
    }

    componentDidUpdate() {
        if(this.props.readings.sensor_type_view_graphs.length) {
            var heatmap_active_sensor_type_index = this.props.readings.heatmap_active_sensor_type_index > -1 ? this.props.readings.heatmap_active_sensor_type_index : 0;

            createHeatmap(this.state.map, this.state.heatmap, this.state.markers, this.props.readings.device_ids, this.props.readings.heatmap_readings_table[heatmap_active_sensor_type_index], this.props.readings.heatmap_date);
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
