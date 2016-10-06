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

const reading = (state, action) => {
    switch(action.type) {
        case 'ADD_READING':

            // Check if the sensor type exists yet. If not, create it.
            if(!state.sensor_types.includes(action.reading.sensor_type)) {
                state = {...state,
                         sensor_type_view_graphs: [...state.sensor_type_view_graphs, []],
                         sensor_types: [...state.sensor_types, action.reading.sensor_type],
                         sensor_types_active: [...state.sensor_types_active, true]
                };
            }

            // Check if the device id exists yet. If not, create it.
            if(!state.device_ids.includes(action.reading.device)) {
                state = {...state,
                         device_view_graphs: [state.device_view_graphs, []],
                         device_ids: [...state.device_ids, action.reading.device],
                         devices_active: [...state.devices_active, true]
                }
            }

            var sensor_type_index = state.sensor_types.indexOf(action.reading.sensor_type);
            var device_index = state.device_ids.indexOf(action.reading.device);

            // Add to the graph in the sensor_type_view_graphs array that shares the sensor_type
            state = {
                        ...state,
                        sensor_type_view_graphs: [
                            ...state.sensor_type_view_graphs.slice(0, sensor_type_index),
                            [
                                ...state.sensor_type_view_graphs[sensor_type_index],
                                readingToDygraphArray(action.reading, device_index, state.device_ids.length)
                            ],
                            ...state.sensor_type_view_graphs.slice(sensor_type_index + 1)
                        ]
                    };

            // Add to the graph in the device_view_graphs array that shares the device
            state = {
                        ...state,
                        device_view_graphs: [
                            ...state.device_view_graphs.slice(0, device_index),
                            [
                                ...state.device_view_graphs[device_index],
                                readingToDygraphArray(action.reading, sensor_type_index, state.sensor_types.length)
                            ],
                            ...state.device_view_graphs.slice(device_index + 1)
                        ]
                    };

        default:
            return state
    }
};

const readings = (state = {device_view_graphs: [], sensor_type_view_graphs: [], device_ids: [], sensor_types: [], devices_active:[], sensor_types_active: []}, action) => {
    switch(action.type) {
        case 'READINGS_PENDING':
            return state;
        case 'READINGS_REJECTED':
            return state;
        case 'READINGS_FULFILLED':
            var new_state = {...state};
            for(var r of action.payload.data.results) {
                new_state = reading(new_state, {type: 'ADD_READING', reading: r});
            }
            return new_state;
        default:
            return state
    }
};

export default readings