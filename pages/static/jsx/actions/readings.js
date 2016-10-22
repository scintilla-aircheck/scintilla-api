import axios from 'axios'

export const readings = (deployment_id) => ({
    type: 'READINGS',
    payload: axios.get('http://localhost:8000/api/v1/readings/?deployment_id=' + String(deployment_id))
});

export const addReading = (reading) => ({
    type: 'ADD_READING',
    reading
});

export const toggleDeviceActive = (index) => ({
    type: 'TOGGLE_DEVICE_ACTIVE',
    index
});

export const toggleSensorTypeActive = (index) => ({
    type: 'TOGGLE_SENSOR_TYPE_ACTIVE',
    index
});

export const changeDate = (start_date, end_date, realtime) => ({
    type: 'CHANGE_DATE',
    start_date,
    end_date,
    realtime
});
/*
export const changeTime = (start_date_hours, start_date_minutes, start_date_seconds, end_date_hours, end_date_minutes, end_date_seconds) => ({
    type: 'CHANGE_TIME',
    start_date_hours,
    start_date_minutes,
    start_date_seconds,
    end_date_hours,
    end_date_minutes,
    end_date_seconds
});
*/
/*
// reducer must add the reading after adding the device
export const addDevice = (reading) => ({
    type: 'ADD_DEVICE',
    reading
});

// reducer must add the reading after adding the device
export const addPollutant = (reading) => ({
    type: 'ADD_POLLUTANT',
    reading
});
*/