import axios from 'axios'

export const readings = (deployment_id) => ({
    type: 'READINGS',
    payload: axios.get('http://localhost:8000/api/v1/readings/?deployment_id=' + String(deployment_id))
});

export const addReading = (reading) => ({
    type: 'ADD_READING',
    reading
});

export const changeDate = (start_date, end_date) => ({
    type: 'CHANGE_DATE',
    start_date,
    end_date
});

export const changeTime = (time) => ({
    type: 'CHANGE_TIME',
    time
});

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