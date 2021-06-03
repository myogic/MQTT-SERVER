const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://localhost:1883")

console.log("Connected flag " + client.connected);

const message = {
    deviceName : "Greenhouse1",
    Temperature: Math.floor(Math.random() * 100),
    Humidinity: Math.floor(Math.random() * 100),
    SoilMoinsture: Math.floor(Math.random() * 100),
    LightSensor: Math.floor(Math.random() * 100),
    Date : new Date()
}

client.on('message', (topic, message, packet) => {
    console.log("message is " + message);
    console.log("topic is  " + topic);
});

client.on('connect', ()=>{
    setInterval(function(){
        client.publish("/deviceInfo", JSON.stringify(message));
        console.log('Pesan terkirim');
        console.log(JSON.stringify("IoT Decice Informatin"))
    }, 2000);
})

client.on('connect', ()=>{
    client.subscribe('deviceInfo');
});

client.on('message', (topic, message)=>{
    message = JSON.parse(message.toString())
    console.log(message)
})