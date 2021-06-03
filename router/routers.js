const client = require('../connection/connection');
const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const Sensor = require('../Sensor/sensor')
//const { ReplSet } = require('mongodb');


// get data sensor 
routers.get('/dashboard', async(req, res) => {
    const sensor = await Sensor.find();
    if(sensor.length > 0){
        res.send({
            status: 'succes',
            message: 'list sensor data  finded',
            data: sensor
        });
    }else{
        res.send({
            status: 'succes',
            message
        })
    }
})
//////////////////////////////////////////////////////
////////////////////// JOURNAL API ///////////////////
//////////////////////////////////////////////////////

// all Journal
routers.get('/journals', async(req, res) => {
    if(client.isConnected()){
        const db = client.db('Greenhouse');
        const Journal = await db.collection('journalData').find().toArray();
        res.send({
            status: 'success',
            message: 'list Journal',
            data: Journal
        });
    }else{
        res.send('Connection database failed');
    }
});


// Single Journal
routers.get('/journal/:id', async(req,res) => {
    if(client.isConnected()){
        const db = client.db('Greenhouse');
        const Journal = await db.collection('journalData').findOne({
            _id: ObjectID(req.params.id)
        });
        res.send({
            status: 'succes',
            message: 'single journal data',
            data: Journal
        });
    }else{
        res.send({
            status: 'error',
            message: 'Failed database connction'
        });
    }
});

routers.post('/journal', async(req, res) => {
    if(client.isConnected()){
        const{title, description} = req.body;
        const db = client.db('Greenhouse');
        const Journal = await db.collection('journalData').insertOne({
            title: title,
            description: description,
            date: new Date()
        });
        res.send({
            status: 'succes',
            message: 'add journal succes'
        });
    }else{
        res.send({
            status: 'warning',
            message: 'fail to add journal',
        });
    }
});

// Update Journal Data
routers.put('/journal/:id', async (req,res) => {
    if(client.isConnected()){
        const{title, description} = req.body
        const db = client.db('Greenhouse');
        const result = await db.collection('journalData').updateOne(
            {_id: ObjectID(req.params.id)},
            {
                $set: {
                    title: title,
                    description: description,
                    //date: new Date()
                }
            });
        if(result.matchedCount == 1){
            res.send({
                status: 'succces',
                message: 'Journal was uppdated'
            });
        }else{
            res.send({
                status: 'Warning',
                message: 'Update Journal Failed'
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Connection failed'
        });
    }
});

routers.delete('/journal/:id', async (req, res) => {
    if(client.isConnected()){
        const db = client.db('Greenhouse');
        const result = await db.collection('journalData').deleteOne(
            {_id: ObjectID(req.params.id)}
        );
        if(result.deletedCount == 1){
            res.send({
                status: 'succes',
                message: 'delete journal success'
            });
            
        }else{
            res.send({
                status: 'warning',
                message: 'delete journal faill'
            });
        }
    }else{
        res.send({
            status: 'error',
            message: 'connection database failed'
        });
    }
});





// WEB SOCKET /// 
routers.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
  })

module.exports = routers;