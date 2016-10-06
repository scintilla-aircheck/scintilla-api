import React from 'react'

import { v4 } from 'node-uuid'

const ReadingGraphList = ({
    readings
}) => {

    return (
        <div className="reading_graph_list_container">
            {readings.device_view_graphs.map(graph => {
                    var id = v4();
                    return (
                        <ReadingGraph
                            key={id}
                            id={id}
                            graph={graph}
                        />
                    )
                }
            )}
        </div>
    )
};

class ReadingGraph extends React.Component {

    componentDidMount() {
        console.log(this.props.id);
        var g = new Dygraph(

            // containing div
            document.getElementById(this.props.id),

            // CSV or path to a CSV file.
            this.props.graph,
            {
                labels: ["Date/Time", "CO"]
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
/*
const ReadingGraph = ({
    graph
}) => {
    console.log(this.props.id);
    g = new Dygraph(

        // containing div
        document.getElementById(this.props.id),

        // CSV or path to a CSV file.
        this.props.graph,
        {
            labels: ["Date/Time", "CO", "CO2", "O3", "SO2", "NO2", "PM2.5"]
        }
    );
    return (
    <div className="reading_graph_container">
        <div id={key}>

        </div>
    </div>
)};
*/
export default ReadingGraphList