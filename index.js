// Lib
const express = require('express'),
 app = express(),
 bodyParser = require('body-parser'),
 mqtt = require('mqtt'),
 mqttClient = mqtt.connect('mqtt://127.0.0.1:1883'),
 Topic = '/deviceInfo',
 Server = app.listen(3000),
 Sensor = require('./Sensor/sensor');
 
require('./connection/connection');
 // Socket Network
const socket = require('socket.io');
const io = socket(Server);

 io.on('connection', (sockets) => {
    console.log('socket connected');
})

 /// MQTT Server /// 
mqttClient.on('connect', () => {
    console.log('Mqtt connected');
    mqttClient.subscribe(Topic);

});
mqttClient.on('offline', () => {
    console.log('MQTT offline');
    mqttClient.unsubscribe('/deviceInfo');
});

mqttClient.on('message',async (topic, message) => {
      message = JSON.parse(message.toString());
      //sio.emit('data', message);
      //console.log("Pesan : ", message);

      const {deviceName, Temperature, Humidinity, SoilMoinsture, LightSensor } = message;
       try{
           const sensor = await Sensor.create({
               deviceName: deviceName,
               Temperature: Temperature,
               Humidinity: Humidinity,
               SoilMoinsture: SoilMoinsture,
               LightSensor: LightSensor,
           });
           console.log(sensor);
           if(sensor){
               console.log("Success Inserted");
           }
       }catch(error){
           console.log("Not Inserted");
       }
      

});

io.on('connection', (socket) => {
    socket.on('event', (data) => {
        console.log('pesan dari client:', data.message);
        let pesan = "ON"
        mqttClient.publish("lamp", pesan)
    });
});


console.log("Starting program")


// parse x-www-form-url-encode 
app.use(bodyParser.urlencoded({extended:true}));
// parse JSON 
app.use(bodyParser.json());

// router
const router = require('./router/routers');
app.use(router);


//  server.listen(3000, function () {
//     console.log('App listening on port 3000!');
// });