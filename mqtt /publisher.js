const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://localhost:1883")

console.log("Connected flag " + client.connected);

const pesan = {
    deviceName : "Greenhouse1",
    Temperature: 0,
    Humidinity: 0,
    SoilMoinsture: 0,
    LightSensor: 0,
    
}
console.log(pesan);

client.on('message', (topic, message, packet) => {
    //console.log("message is " + message);
    //console.log("topic is  " + topic);
    if (topic === "DHT1"){
        pesan.Temperature = message.toString()
        console.log(`pesan ${pesan}`);
     }
    else if (topic == "DHT2"){
        pesan.Humidinity = message.toString()
    }
    else if (topic == "DHT3"){
        pesan.LightSensor = message.toString()
    }
    else if (topic == "DHT4"){
        pesan.SoilMoinsture = message.toString()
        console.log(`pesan ${pesan}`);
    }
    console.log(message.toString);
    
});


client.on('connect', ()=>{
    setInterval(function(){
        client.publish("/deviceInfo", JSON.stringify(pesan));
        console.log('Pesan terkirim');
        console.log(pesan)
    }, 1000);
})

client.on('connect', ()=>{
    client.subscribe('DHT1');
    client.subscribe('DHT2');
    client.subscribe('DHT3');
    client.subscribe('DHT4');
});

client.on('message', ( message)=>{
    message = message.toString()
    console.log(message)
})