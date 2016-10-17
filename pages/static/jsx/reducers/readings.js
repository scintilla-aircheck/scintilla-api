export const initial_readings_state = {device_view_graphs: [], device_ids: [], device_names: [], devices_active: [], sensor_type_view_graphs: [], sensor_types: [], sensor_type_names: [], sensor_types_active: []};

const readingToDygraphArray = (reading, index, length) => {
    var retVal = [];
    retVal.push(new Date(reading.time));
    for(var i = 0; i < length; i++) {
        if(i != index) {
            retVal.push(null);
        } else {
            retVal.push(reading.value);
        }
    }
    return retVal;
};

export const readings = (state = initial_readings_state, action) => {
    switch(action.type) {
        case 'READINGS_PENDING':
            return state;
        case 'READINGS_REJECTED':
            return state;
        case 'READINGS_FULFILLED':
            let new_state = {...state};
            for(var r of action.payload.data.results) {
                new_state = readings(new_state, {type: 'ADD_READING', reading: r});
            }
            return new_state;
        case 'ADD_READING':

            if( action.reading.device === undefined || action.reading.device === null ||
                action.reading.sensor_type === undefined || action.reading.sensor_type === null) {
                return {...state};
            }

            let device_view_graphs = [...state.device_view_graphs.map(g => ([...g]))];
            let device_ids = [...state.device_ids];
            let device_names = [...state.device_names];
            let devices_active = [...state.devices_active];
            let sensor_type_view_graphs = [...state.sensor_type_view_graphs.map(g => ([...g]))];
            let sensor_types = [...state.sensor_types];
            let sensor_type_names = [...state.sensor_type_names];
            let sensor_types_active = [...state.sensor_types_active];

            // Check if the device id exists yet. If not, create it.
            if(action.reading.device && !state.device_ids.includes(action.reading.device)) {
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
            if(action.reading.sensor_type && !state.sensor_types.includes(action.reading.sensor_type)) {
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

            let sensor_type_index = sensor_types.indexOf(action.reading.sensor_type);
            let device_index = device_ids.indexOf(action.reading.device);

            // Add to the graph in the device_view_graphs array that shares the device
            var new_time = true;
            for(var i = device_view_graphs[device_index].length - 1; i >= 0; i--) {
                if(device_view_graphs[device_index][i].length) {
                    if (device_view_graphs[device_index][i][0].toISOString().slice(0, 19) == action.reading.time.slice(0, 19)) {
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
                    if (sensor_type_view_graphs[sensor_type_index][i][0].toISOString().slice(0, 19) == action.reading.time.slice(0, 19)) {
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

            return {...state, device_view_graphs: device_view_graphs, device_ids: device_ids, device_names: device_names, devices_active: devices_active, sensor_type_view_graphs: sensor_type_view_graphs, sensor_types: sensor_types, sensor_type_names: sensor_type_names, sensor_types_active: sensor_types_active};
        default:
            return state
    }
};