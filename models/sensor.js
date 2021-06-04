const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    deviceName: {
        type: String
    },
    Temperature:{
        type: Number,
    },
    Humidinity:{
        type: Number
    },
    SoilMoinsture:{
        type: Number
    },
    LightSensor:{
        type: Number
    },
},
{
    timestamps: true
});

const Sensor = mongoose.model('sensor', sensorSchema);

module.exports =  Sensor