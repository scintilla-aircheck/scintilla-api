export const addReading = (reading) => ({
    type: 'ADD_READING',
    reading
});

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

