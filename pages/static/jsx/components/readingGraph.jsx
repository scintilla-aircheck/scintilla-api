import React from 'react'

import { v4 } from 'node-uuid'

const ReadingGraphList = ({
    readings
}) => {

    return (
        <div>
            <div className="reading_graph_list_container">
                {readings.device_view_graphs.map(graph => {
                        var id = v4();
                        return (
                            <ReadingGraph
                                key={id}
                                id={id}
                                graph={graph}
                                labels={readings.sensor_type_names}
                                active={readings.sensor_types_active}
                            />
                        )
                    }
                )}
            </div>
            <div className="reading_graph_list_container">
                {readings.sensor_type_view_graphs.map(graph => {
                        var id = v4();
                        return (
                            <ReadingGraph
                                key={id}
                                id={id}
                                graph={graph}
                                labels={readings.device_names}
                                active={readings.devices_active}
                            />
                        )
                    }
                )}
            </div>
        </div>
    )
};

class ReadingGraph extends React.Component {

    componentDidMount() {
        let labels = ["Date/Time"];
        for(var i = 0; i < this.props.labels.length; i++) {
            labels.push(this.props.labels[i]);
        }

        //console.log(labels);
        //console.log(this.props.graph);

        var g = new Dygraph(

            // containing div
            document.getElementById(this.props.id),

            // CSV or path to a CSV file.
            this.props.graph,
            {
                labels: labels,
                visibility: this.props.active,
                stacked: false,
                connectSeparatedPoints: true
            }
        );
    }

    componentDidUpdate() {

    }

    render() {

        return (
            <div className="reading_graph_container">
                <div id={this.props.id}>

                </div>
            </div>
        )
    }
}

export default ReadingGraphList