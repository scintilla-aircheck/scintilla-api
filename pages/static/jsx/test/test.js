import 'babel-polyfill'
var chai = require('chai');
var deepFreeze = require('deep-freeze-strict');
import { readings, initial_readings_state } from '../reducers/readings'

var expect = chai.expect;

describe('reading reducer', function() {
    describe('ADD_READING', function() {
        it('should add new sensor_types to "sensor_type_view_graphs", "sensor_types", and "sensor_types_active"; and new device_ids to "device_view_graphs", "device_ids", and "devices_active"', function() {
            const state_1 = initial_readings_state;

            const action_1 = {
                type: 'ADD_READING',
                reading: {
                    sensor_type: 1,
                    device: 1,
                    value: 1.2,
                    time: '2016-05-05T01:01:01'
                }
            };

            deepFreeze(state_1);
            deepFreeze(action_1);

            const date_1 = new Date(action_1.reading.time);

            const state_2 = readings(state_1, action_1);

            expect(
                state_2
            ).to.deep.equal({
                device_view_graphs: [[[date_1, 1.2]]],
                device_ids: [1],
                device_names: [''],
                devices_active:[true],
                sensor_type_view_graphs: [[[date_1, 1.2]]],
                sensor_types: [1],
                sensor_type_names: [''],
                sensor_types_active: [true]
            });

            const action_2 = {
                type: 'ADD_READING',
                reading: {
                    sensor_type: 2,
                    device: 2,
                    value: 3.4,
                    time: '2016-05-05T01:01:01'
                }
            };

            deepFreeze(state_2);
            deepFreeze(action_2);

            const date_2 = new Date(action_2.reading.time);

            const state_3 = readings(state_2, action_2);

            expect(
                state_3
            ).to.deep.equal({
                device_view_graphs: [[[date_1, 1.2, null]], [[date_2, null, 3.4]]],
                device_ids: [1, 2],
                device_names: ['', ''],
                devices_active:[true, true],
                sensor_type_view_graphs: [[[date_1, 1.2, null]], [[date_2, null, 3.4]]],
                sensor_types: [1, 2],
                sensor_type_names: ['', ''],
                sensor_types_active: [true, true]
            });

            const action_3 = {
                type: 'ADD_READING',
                reading: {
                    sensor_type: 1,
                    device: 1,
                    value: 5.6,
                    time: '2016-05-05T01:01:02'
                }
            };

            deepFreeze(state_3);
            deepFreeze(action_3);

            const date_3 = new Date(action_3.reading.time);

            const state_4 = readings(state_3, action_3);

            expect(
                state_4
            ).to.deep.equal({
                device_view_graphs: [[[date_1, 1.2, null], [date_3, 5.6, null]], [[date_2, null, 3.4]]],
                device_ids: [1, 2],
                device_names: ['', ''],
                devices_active:[true, true],
                sensor_type_view_graphs: [[[date_1, 1.2, null], [date_3, 5.6, null]], [[date_2, null, 3.4]]],
                sensor_types: [1, 2],
                sensor_type_names: ['', ''],
                sensor_types_active: [true, true]
            });
        });
    });
});
