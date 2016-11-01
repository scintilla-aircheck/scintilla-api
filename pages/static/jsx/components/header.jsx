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
            start_date.setHours(0);
            start_date.setMinutes(0);
            start_date.setSeconds(0);
            //start_date.setHours(this.props.start_date.getHours());
            //start_date.setMinutes(this.props.start_date.getMinutes());
            //start_date.setSeconds(this.props.start_date.getSeconds());
            var end_date = date.endDate.toDate();
            end_date.setHours(23);
            end_date.setMinutes(59);
            end_date.setSeconds(59);
            //end_date.setHours(this.props.end_date.getHours());
            //end_date.setMinutes(this.props.end_date.getMinutes());
            //end_date.setSeconds(this.props.end_date.getSeconds());

            var now = new Date();
            var realtime = end_date > now;

            this.props.onDateChange(start_date, end_date, realtime);
        }
    }

    toggleDisplayCalendar() {
        this.setState({display_calendar: !this.state.display_calendar});
    }

    render() {
        const format = 'ddd, D MMM YYYY';

        return (
            <div className="header-container">
                <DeploymentList deployments={this.props.deployments}
                                current_deployment={this.props.current_deployment}
                                onDeploymentClick={this.props.onDeploymentClick} />
                <div className="header-date-container">
                    <div className="header-date-button-container" onClick={ this.toggleDisplayCalendar.bind(this) }>
                        <div className="header-date-button-inner-container">
                            <div className="header-date-button-text">
                                { [this.props.start_date && moment(this.props.start_date).format(format).toString(), ' ', <span key="dummy">&mdash;</span>, ' ', this.props.end_date && moment(this.props.end_date).format(format).toString()] }
                            </div>
                            <div className="header-date-button-arrow">

                            </div>
                        </div>
                    </div>
                    <div className={ this.state.display_calendar ? "date-range-container" : "date-range-container hidden" }>
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