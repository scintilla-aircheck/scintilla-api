import React from 'react'
import { DateRange } from 'react-date-range'

import { defaultRanges } from '../utils/defaultRanges'

import moment from 'moment'

import DeploymentList from './deployments.jsx'

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            display_calendar: false
        };

        /*this.state = {
            'predefined' : {startDate: defaultRanges.Today.startDate(moment()), endDate: defaultRanges.Today.endDate(moment())}
        }*/
    }

    handleDateChange(date) {
        if(date.startDate > date.endDate) {
            var temp = date.startDate;
            date.startDate = date.endDate;
            date.endDate = temp;
        }

        if( !(date.startDate === '' || date.endDate === '' || date.startDate === undefined || date.endDate === undefined || date.startDate === null || date.endDate === null) ) {
            console.log(date.startDate.toDate());
            console.log(date.endDate.toDate());

            var start_date = date.startDate.toDate();
            start_date.setHours(this.props.start_date.getHours());
            start_date.setMinutes(this.props.start_date.getMinutes());
            start_date.setSeconds(this.props.start_date.getSeconds());
            var end_date = date.endDate.toDate();
            end_date.setHours(this.props.end_date.getHours());
            end_date.setMinutes(this.props.end_date.getMinutes());
            end_date.setSeconds(this.props.end_date.getSeconds());

            var now = new Date();
            var realtime = end_date > now;

            this.props.onDateChange(start_date, end_date, realtime);
        }
    }

    render() {
        const format = 'dddd, D MMMM YYYY';

        return (
            <div className="header-container">
                <DeploymentList deployments={this.props.deployments}
                                current_deployment={this.props.current_deployment}
                                onDeploymentClick={this.props.onDeploymentClick} />
                <div>
                    <div>
                        <input
                            type="text"
                            readOnly
                            value={ this.props.start_date && moment(this.props.start_date).format(format).toString() }
                        />
                        <input
                            type="text"
                            readOnly
                            value={ this.props.end_date && moment(this.props.end_date).format(format).toString() }
                        />
                    </div>
                    <DateRange
                        linkedCalendars={ true }
                        ranges={ defaultRanges }
                        //onInit={ this.handleDateChange.bind(this) }
                        onChange={ this.handleDateChange.bind(this) }
                        theme={{
                            Calendar : { width: 200 },
                            PredefinedRanges : { marginLeft: 10, marginTop: 10 }
                        }}
                    />
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    deployments: React.PropTypes.any.isRequired,
    current_deployment: React.PropTypes.any.isRequired,
    start_date: React.PropTypes.any.isRequired,
    end_date: React.PropTypes.any.isRequired,
    onDeploymentClick: React.PropTypes.func.isRequired,
    onDateChange: React.PropTypes.func.isRequired
};

export default Header