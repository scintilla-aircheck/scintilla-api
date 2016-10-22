let initial_end_date = new Date();
//initial_end_date.setHours(23);
//initial_end_date.setMinutes(59);
//initial_end_date.setSeconds(59);
let initial_start_date = new Date(initial_end_date.valueOf());
console.log('!!!!');
console.log(initial_end_date);
console.log(initial_start_date);
initial_start_date.setHours(0);
initial_start_date.setMinutes(0);
initial_start_date.setSeconds(0);
console.log(initial_end_date);
console.log(initial_start_date);

export const initial_readings_state = {
    device_view_graphs: [],
    device_ids: [],
    device_names: [],
    devices_active: [],
    sensor_type_view_graphs: [],
    sensor_types: [],
    sensor_type_names: [],
    sensor_types_active: [],
    start_date: initial_start_date,
    end_date: initial_end_date,
    realtime: true
};

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
};

const readingToDygraphArray = (reading, index, length) => {
    var dygraph_array = [];
    dygraph_array.push(new Date(reading.time));
    for(var i = 0; i < length; i++) {
        if(i != index) {
            dygraph_array.push(null);
        } else {
            dygraph_array.push(reading.value);
        }
    }
    return dygraph_array;
};

export const readings = (state = initial_readings_state, action) => {
    switch(action.type) {
        case 'TOGGLE_DEVICE_ACTIVE':
            return {...state, devices_active: [
                                                ...state.devices_active.slice(0, action.index),
                                                !state.devices_active[action.index],
                                                ...state.devices_active.slice(action.index + 1)
                                              ]
                   };
        case 'TOGGLE_SENSOR_TYPE_ACTIVE':
            return {...state, sensor_types_active: [
                                                    ...state.sensor_types_active.slice(0, action.index),
                                                    !state.sensor_types_active[action.index],
                                                    ...state.sensor_types_active.slice(action.index + 1)
                                                   ]
                   };
        case 'CHANGE_DATE':
            return {...state, start_date: action.start_date, end_date: action.end_date, realtime: action.realtime};
        /*case 'CHANGE_TIME':
            let new_start_date = state.start_date.valueOf();
            new_start_date.setHours(action.start_date_hours);
            new_start_date.setMinutes(action.start_date_minutes);
            new_start_date.setSeconds(action.start_date_seconds);
            let new_end_date = state.end_date.valueOf();
            new_end_date.setHours(action.end_date_hours);
            new_end_date.setMinutes(action.end_date_minutes);
            new_end_date.setSeconds(action.end_date_seconds);
            return {...state, start_date: new_start_date, end_date: new_end_date};*/
        case 'READINGS_PENDING':
            return state;
        case 'READINGS_REJECTED':
            return state;
        case 'READINGS_FULFILLED':
            return readings(state, {type: 'ADD_READINGS', readings: action.payload.data.results});

            /*let new_state = {...initial_readings_state};

            for(var r of action.payload.data.results) {
                console.log('%');
                new_state = readings(new_state, {type: 'ADD_READING', reading: r});
            }
            return new_state;*/
        case 'ADD_READINGS':

            if( action.readings === undefined || action.readings === null) {
                return {...state};
            }

            var device_view_graphs = [...state.device_view_graphs.map(g => ([...g]))];
            var device_ids = [...state.device_ids];
            var device_names = [...state.device_names];
            var devices_active = [...state.devices_active];
            var sensor_type_view_graphs = [...state.sensor_type_view_graphs.map(g => ([...g]))];
            var sensor_types = [...state.sensor_types];
            var sensor_type_names = [...state.sensor_type_names];
            var sensor_types_active = [...state.sensor_types_active];

            for(var reading of action.readings) {

                // Check if the device id exists yet. If not, create it.
                if(reading.device && !device_ids.includes(reading.device)) {
                    device_view_graphs.push([]);
                    device_ids.push(reading.device);
                    if(reading.device_name === undefined || reading.device_name === null) {
                        device_names.push('');
                    } else {
                        device_names.push(reading.device_name);
                    }
                    devices_active.push(true);

                    // we need to at a null at the end of the first reading of every graph so that dygraphs will render all of the data points
                    for(var i = 0; i < sensor_type_view_graphs.length; i++) {
                        if(sensor_type_view_graphs[i].length) {
                            sensor_type_view_graphs[i][0].push(null);
                        }
                    }
                }

                // Check if the sensor type exists yet. If not, create it.
                if(reading.sensor_type && !sensor_types.includes(reading.sensor_type)) {
                    sensor_type_view_graphs.push([]);
                    sensor_types.push(reading.sensor_type);
                    if(reading.sensor_type_name === undefined || reading.sensor_type_name === null) {
                        sensor_type_names.push('');
                    } else {
                        sensor_type_names.push(reading.sensor_type_name);
                    }
                    sensor_types_active.push(true);

                    // we need to at a null at the end of the first reading of every graph so that dygraphs will render all of the data points
                    for(var i = 0; i < device_view_graphs.length; i++) {
                        if(device_view_graphs[i].length) {
                            device_view_graphs[i][0].push(null);
                        }
                    }
                }

                var sensor_type_index = sensor_types.indexOf(reading.sensor_type);
                var device_index = device_ids.indexOf(reading.device);
                var reading_time = (new Date(reading.time)).getTime();

                // Add to the graph in the device_view_graphs array that shares the device
                var new_time = true;
                for(var i = device_view_graphs[device_index].length - 1; i >= 0; i--) {
                    if(device_view_graphs[device_index][i].length) {
                        if (device_view_graphs[device_index][i][0].getTime() == reading_time) {
                            device_view_graphs[device_index][i][sensor_type_index + 1] = reading.value;
                            new_time = false;
                            break;
                        }
                    }
                }
                if(new_time) {
                    device_view_graphs[device_index].push(readingToDygraphArray(reading, sensor_type_index, sensor_types.length));
                }

                // Add to the graph in the sensor_type_view_graphs array that shares the sensor_type
                var new_time = true;
                for(var i = sensor_type_view_graphs[sensor_type_index].length - 1; i >= 0; i--) {
                    if(sensor_type_view_graphs[sensor_type_index][i].length) {
                        if (sensor_type_view_graphs[sensor_type_index][i][0].getTime() == reading_time) {
                            sensor_type_view_graphs[sensor_type_index][i][device_index + 1] = reading.value;
                            new_time = false;
                            break;
                        }
                    }
                }
                if(new_time) {
                    sensor_type_view_graphs[sensor_type_index].push(readingToDygraphArray(reading, device_index, device_ids.length));
                }
            }

            var end_date = state.realtime ? new Date() : Object.assign(state.end_date);

            var start_date = Object.assign(state.start_date);
            if( state.start_date > end_date ) {
                start_date.setTime(state.end_date.getTime() - (7*24*3600000));
            }

            return {...state, device_view_graphs: device_view_graphs, device_ids: device_ids, device_names: device_names, devices_active: devices_active, sensor_type_view_graphs: sensor_type_view_graphs, sensor_types: sensor_types, sensor_type_names: sensor_type_names, sensor_types_active: sensor_types_active, start_date: start_date, end_date: end_date};

        case 'ADD_READING':

            if( action.reading.device === undefined || action.reading.device === null ||
                action.reading.sensor_type === undefined || action.reading.sensor_type === null) {
                return {...state};
            }

            var device_view_graphs = [...state.device_view_graphs.map(g => ([...g]))];
            var device_ids = [...state.device_ids];
            var device_names = [...state.device_names];
            var devices_active = [...state.devices_active];
            var sensor_type_view_graphs = [...state.sensor_type_view_graphs.map(g => ([...g]))];
            var sensor_types = [...state.sensor_types];
            var sensor_type_names = [...state.sensor_type_names];
            var sensor_types_active = [...state.sensor_types_active];

            // Check if the device id exists yet. If not, create it.
            if(action.reading.device && !device_ids.includes(action.reading.device)) {
                device_view_graphs.push([]);
                device_ids.push(action.reading.device);
                if(action.reading.device_name === undefined || action.reading.device_name === null) {
                    device_names.push('');
                } else {
                    device_names.push(action.reading.device_name);
                }
                devices_active.push(true);

                // we need to at a null at the end of the first reading of every graph so that dygraphs will render all of the data points
                for(var i = 0; i < sensor_type_view_graphs.length; i++) {
                    if(sensor_type_view_graphs[i].length) {
                        sensor_type_view_graphs[i][0] = [...sensor_type_view_graphs[i][0], null];
                    }
                }
            }

            // Check if the sensor type exists yet. If not, create it.
            if(action.reading.sensor_type && !sensor_types.includes(action.reading.sensor_type)) {
                sensor_type_view_graphs.push([]);
                sensor_types.push(action.reading.sensor_type);
                if(action.reading.sensor_type_name === undefined || action.reading.sensor_type_name === null) {
                    sensor_type_names.push('');
                } else {
                    sensor_type_names.push(action.reading.sensor_type_name);
                }
                sensor_types_active.push(true);

                // we need to at a null at the end of the first reading of every graph so that dygraphs will render all of the data points
                for(var i = 0; i < device_view_graphs.length; i++) {
                    if(device_view_graphs[i].length) {
                        device_view_graphs[i][0] = [...device_view_graphs[i][0], null];
                    }
                }
            }

            var sensor_type_index = sensor_types.indexOf(action.reading.sensor_type);
            var device_index = device_ids.indexOf(action.reading.device);
            var reading_time = (new Date(action.reading.time)).getTime();

            // Add to the graph in the device_view_graphs array that shares the device
            var new_time = true;
            for(var i = device_view_graphs[device_index].length - 1; i >= 0; i--) {
                if(device_view_graphs[device_index][i].length) {
                    if (device_view_graphs[device_index][i][0].getTime() == reading_time) {
                        device_view_graphs = [
                            ...device_view_graphs.slice(0, device_index),
                            [
                                ...device_view_graphs[device_index].slice(0, i),
                                [
                                    ...device_view_graphs[device_index][i].slice(0, sensor_type_index + 1),
                                    action.reading.value,
                                    ...device_view_graphs[device_index][i].slice(sensor_type_index + 2)
                                ],
                                ...device_view_graphs[device_index].slice(i + 1)
                            ],
                            ...device_view_graphs.slice(device_index + 1)
                        ];
                        new_time = false;
                        break;
                    }
                }
            }
            if(new_time) {
                device_view_graphs = [
                    ...device_view_graphs.slice(0, device_index),
                    [
                        ...device_view_graphs[device_index],
                        readingToDygraphArray(action.reading, sensor_type_index, sensor_types.length)
                    ],
                    ...device_view_graphs.slice(device_index + 1)
                ];
            }

            // Add to the graph in the sensor_type_view_graphs array that shares the sensor_type
            var new_time = true;
            for(var i = sensor_type_view_graphs[sensor_type_index].length - 1; i >= 0; i--) {
                if(sensor_type_view_graphs[sensor_type_index][i].length) {
                    if (sensor_type_view_graphs[sensor_type_index][i][0].getTime() == reading_time) {
                        sensor_type_view_graphs = [
                            ...sensor_type_view_graphs.slice(0, sensor_type_index),
                            [
                                ...sensor_type_view_graphs[sensor_type_index].slice(0, i),
                                [
                                    ...sensor_type_view_graphs[sensor_type_index][i].slice(0, device_index + 1),
                                    action.reading.value,
                                    ...sensor_type_view_graphs[sensor_type_index][i].slice(device_index + 2)
                                ],
                                ...sensor_type_view_graphs[sensor_type_index].slice(i + 1)
                            ],
                            ...sensor_type_view_graphs.slice(sensor_type_index + 1)
                        ];
                        new_time = false;
                        break;
                    }
                }
            }
            if(new_time) {
                sensor_type_view_graphs = [
                    ...sensor_type_view_graphs.slice(0, sensor_type_index),
                    [
                        ...sensor_type_view_graphs[sensor_type_index],
                        readingToDygraphArray(action.reading, device_index, device_ids.length)
                    ],
                    ...sensor_type_view_graphs.slice(sensor_type_index + 1)
                ];
            }

            var end_date = state.realtime ? new Date() : Object.assign(state.end_date);

            var start_date = Object.assign(state.start_date);
            if( state.start_date > end_date ) {
                start_date.setTime(state.end_date.getTime() - (7*24*3600000));
            }

            return {...state, device_view_graphs: device_view_graphs, device_ids: device_ids, device_names: device_names, devices_active: devices_active, sensor_type_view_graphs: sensor_type_view_graphs, sensor_types: sensor_types, sensor_type_names: sensor_type_names, sensor_types_active: sensor_types_active, start_date: start_date, end_date: end_date};
        default:
            return state
    }
};