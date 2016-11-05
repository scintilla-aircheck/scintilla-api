import React from 'react'

import { v4 } from 'node-uuid'

class ReadingGraphList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {queued_update_count: 0, last_update_time: null};
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

    componentDidUpdate() {
        console.log('./components/readingGraph.jsx:: ReadingGraphList: COMPONENT DID UPDATE');
    }

    render() {
        console.log('./components/readingGraph.jsx:: ReadingGraphList: RENDER');
        return (
            <div className="reading-graphs-section">
                <div className="reading-graphs-container">
                    <div className="reading-graphs-header">
                        <div className="reading-graphs-header-title">Sensors</div>
                        <div>
                            {
                                this.props.readings.sensor_type_names.map((name, index) => {
                                    var className = this.props.readings.sensor_types_active[index] ? 'tag active' : 'tag';
                                    return (
                                        <span className={className} onClick={() => this.props.toggleSensorTypeActive(index)} key={index}>{name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="reading-graphs">
                        {
                            this.props.readings.device_view_graphs.map((graph, index) => {
                                var id = v4();
                                return (
                                    <ReadingGraph
                                        key={index}
                                        id={id}
                                        graph={graph}
                                        title={this.props.readings.device_names[index]}
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
                        <div className="reading-graphs-header-title">Pollutants</div>
                        <div>
                            {
                                this.props.readings.device_names.map((name ,index) => {
                                    var className = this.props.readings.devices_active[index] ? 'tag active' : 'tag';
                                    return (
                                        <span className={className} onClick={() => this.props.toggleDeviceActive(index)} key={index}>{name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="reading-graphs">
                        {
                            this.props.readings.sensor_type_view_graphs.map((graph, index) => {
                                var id = v4();
                                return (
                                    <ReadingGraph
                                        key={index}
                                        id={id}
                                        graph={graph}
                                        labels={this.props.readings.device_names}
                                        title={this.props.readings.sensor_type_names[index]}
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
}

ReadingGraphList.propTypes = {
    readings: React.PropTypes.any.isRequired,
    toggleDeviceActive: React.PropTypes.any.isRequired,
    toggleSensorTypeActive: React.PropTypes.any.isRequired
};

class ReadingGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //console.log('./components/readingGraph.jsx:: ReadingGraph: COMPONENT DID MOUNT');
        this.createGraph();
    }

    componentDidUpdate() {
        this.updateGraph();
    }

    createGraph() {
        //console.log('./components/readingGraph.jsx:: ReadingGraph: CREATE GRAPH');

        var dateWindow = null;

        if( this.props.start_date && this.props.end_date ) {
            dateWindow = [this.props.start_date.getTime(), this.props.end_date.getTime()];
        }

        let labels = ["Date/Time"];
        for(var i = 0; i < this.props.labels.length; i++) {
            labels.push(this.props.labels[i]);
        }

        this.state.g = new Dygraph(

            // containing div
            document.getElementById(this.props.id),

            // CSV or path to a CSV file.
            this.props.graph,
            {
                labels: labels,
                visibility: this.props.active,
                stackedGraph: false,
                connectSeparatedPoints: true,
                dateWindow: dateWindow,
                valueRange: null,
                rightGap: 10,
                title: this.props.title,
                labelsDiv: document.getElementById('legend-' + String(this.props.id)),
                hideOverlayOnMouseOut: true,
                rollPeriod: 7,
                showRoller: true,
                interactionModel: {}
            }
        );
    }

    updateGraph() {
        //console.log('./components/readingGraph.jsx:: ReadingGraph: UPDATE GRAPH');

        var dateWindow = null;

        if( this.props.start_date && this.props.end_date ) {
            dateWindow = [this.props.start_date.getTime(), this.props.end_date.getTime()];
        }

        let labels = ["Date/Time"];
        for(var i = 0; i < this.props.labels.length; i++) {
            labels.push(this.props.labels[i]);
        }

        this.state.g.updateOptions({
            visibility: this.props.active,
            file: this.props.graph,
            labels: labels,
            dateWindow: dateWindow
        });
    }

    render() {
        return (
            <div className="reading-graph-container">
                <div className="reading-graph" id={this.props.id}>

                </div>
                <div className="reading-graph-legend" id={"legend-" + this.props.id}></div>
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