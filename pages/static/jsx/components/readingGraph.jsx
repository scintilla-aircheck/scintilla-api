import React from 'react'

import { v4 } from 'node-uuid'
/*
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
};*/

class ReadingGraphList extends React.Component {

    componentDidUpdate() {
        console.log('./components/readingGraph.jsx:: ReadingGraphList: COMPONENT DID UPDATE');
        console.log(this.props.readings.start_date);
        console.log(this.props.readings.end_date);
    }

    render() {
        console.log('./components/readingGraph.jsx:: ReadingGraphList: RENDER');
        return (
            <div className="reading-graphs-section">
                <div className="reading-graphs-container">
                    <div className="reading-graphs-header">
                        <div className="reading-graphs-header-title">By Scouts</div>
                        <div>
                            {
                                this.props.readings.sensor_type_names.map(name => {
                                    var id = v4();
                                    return (
                                        <span key={id}>{name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="reading-graphs">
                        {this.props.readings.device_view_graphs.map(graph => {
                                var id = v4();
                                return (
                                    <ReadingGraph
                                        key={id}
                                        id={id}
                                        graph={graph}
                                        labels={this.props.readings.sensor_type_names}
                                        active={this.props.readings.sensor_types_active}
                                        start_date={this.props.readings.start_date}
                                        end_date={this.props.readings.end_date}
                                    />
                                )
                            }
                        )}
                    </div>
                </div>
                <div className="reading-graphs-container">
                    <div className="reading-graphs-header">
                        <div className="reading-graphs-header-title">By Pollutants</div>
                        <div>
                            {
                                this.props.readings.device_names.map(name => {
                                    var id = v4();
                                    return (
                                        <span key={id}>{name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="reading-graphs">
                        {this.props.readings.sensor_type_view_graphs.map(graph => {
                                var id = v4();
                                return (
                                    <ReadingGraph
                                        key={id}
                                        id={id}
                                        graph={graph}
                                        labels={this.props.readings.device_names}
                                        active={this.props.readings.devices_active}
                                        start_date={this.props.readings.start_date}
                                        end_date={this.props.readings.end_date}
                                    />
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        )
    }
};

ReadingGraphList.propTypes = {
    readings: React.PropTypes.any.isRequired
};

class ReadingGraph extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('./components/readingGraph.jsx:: ReadingGraph: COMPONENT DID MOUNT');
        this.updateGraphs();
    }

    componentDidUpdate() {
        //this.updateGraphs();
    }

    updateGraphs() {
        console.log('./components/readingGraph.jsx:: ReadingGraph: UPDATE GRAPHS');

        console.log(this.props.start_date);
        console.log(this.props.end_date);

        var dateWindow = null;

        if( this.props.start_date && this.props.end_date ) {
            dateWindow = [this.props.start_date.getTime(), this.props.end_date.getTime()];
        }

        let labels = ["Date/Time"];
        for(var i = 0; i < this.props.labels.length; i++) {
            labels.push(this.props.labels[i]);
        }

        var g = new Dygraph(

            // containing div
            document.getElementById(this.props.id),

            // CSV or path to a CSV file.
            this.props.graph,
            {
                labels: labels,
                visibility: this.props.active,
                stacked: false,
                connectSeparatedPoints: true,
                dateWindow: dateWindow,
                valueRange: null
            }
        );
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

ReadingGraph.propTypes = {
    graph: React.PropTypes.any.isRequired,
    labels: React.PropTypes.any.isRequired,
    active: React.PropTypes.any.isRequired
};

export default ReadingGraphList