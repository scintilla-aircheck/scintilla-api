import React from 'react'
import { DateRange } from 'react-date-range'

import { defaultRanges } from '../utils/defaultRanges'

import moment from 'moment'

import DeploymentList from './deployments.jsx'

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);

        console.log('TEST');
        console.log(defaultRanges.Today.startDate(moment()));

        this.state = {
            'predefined' : {startDate: defaultRanges.Today.startDate(moment()), endDate: defaultRanges.Today.endDate(moment())}
            //'predefined': defaultRanges.Today(moment())
        }
    }

    handleChange(which, payload) {
        if(payload.startDate > payload.endDate) {
            var temp = payload.startDate;
            payload.startDate = payload.endDate;
            payload.endDate = temp;
        }
        this.setState({
            [which] : payload
        });
        if( !(this.state.predefined.startDate === '' || this.state.predefined.endDate === '') ) {
            console.log(this.state.predefined.startDate.toDate());
            console.log(this.state.predefined.endDate.toDate());
        }
    }

    render() {
        const {predefined} = this.state;
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
                            value={ predefined['startDate'] && predefined['startDate'].format(format).toString() }
                        />
                        <input
                            type="text"
                            readOnly
                            value={ predefined['endDate'] && predefined['endDate'].format(format).toString() }
                        />
                    </div>
                    <DateRange
                        linkedCalendars={ true }
                        ranges={ defaultRanges }
                        onInit={ this.handleChange.bind(this, 'predefined') }
                        onChange={ this.handleChange.bind(this, 'predefined') }
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
    onDeploymentClick: React.PropTypes.func.isRequired
};

export default Header