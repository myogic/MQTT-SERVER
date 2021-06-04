const client = require('../connection/connection');
const express = require('express');
const routers = express.Router();
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const Sensor = require('../Sensor/sensor')
const Journal = require('../Journal/journal');


// get data sensor 
routers.get('/dashboard', async(req, res) => {
    const sensor = await Sensor.find();
    if(sensor.length > 0){
        res.send({
            status: 'succes',
            message: 'list sensor data  was found',
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

routers.get('/journals', async (req,res) => {
    const journals = await Journal.find();
    if(journals.length > 0){
        res.send({
            status: 'succes',
            message: 'list journal was found',
            data: journals
        });
    }else{
        res.send({
            status: 'succes',
            message: 'list journal not found',

        });
    }
});

// single Journal
routers.get('/journal/:id', async (req,res) => {
    const journal = await Journal.findById(req.params.id);
    if(journal){
        res.send({
            status: 'success',
            message: 'single journal was found',
            data: journal,
        });
    }else{
        res.send({
            status: 'warning',
            message: 'single journal not found',
        });
    }
});

// add journal
routers.post('/journal', async (req, res) => {
    const {title, description} = req.body
    try{
        const journal = await Journal.create({
            title: title,
            description: description
        });
        if(journal){
            res.send({
                status: 'success',
                message: 'add journal success',
                data: journal
            });
        }else{
            res.send({
                status: 'warning',
                message: 'add journal failed',
            });
        }
    }catch(error){
        res.send({
            status: 'error',
            message: error.message,
        });
    }
});

// Update Journal
routers.put('/journal/:id', async(req, res) =>{
    const {title, description} = req.body
    try{
        const result = await Journal.updateOne(
            {_id: req.params.id},
            {
                titile: '',
                description: description,
            }, 
            {runValidators: true}
            );
            if (result.ok ==1){
                res.send({
                    status: 'success',
                    message: 'update product success',
                    data: result
                });
            }else{
                res.send({
                    status: 'warning',
                    message: 'update journal failed',
                });
            }
    }catch(error){
        res.send({
            status: 'error',
            message: error.message,
        });
    };
});

// Delete Journal

routers.delete('/journal/:id', async (req, res) => {
    try{
        const result = await Journal.deleteOne(
            {_id: req.params.id}
            );
            if(result.deleteCount ==1){
                res.send({
                    status: 'success',
                    message: 'delete product success',
                    data: result
                });
            }else{
                res.send({
                    status: 'warning',
                    message: 'delete journal failed',
                    data: result
                });
            }
    }catch(error){
        res.send({
            status: 'error',
            message: error.message,
        });
    };
});


module.exports = routers;


// WEB SOCKET /// 
routers.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
  })

module.exports = routers;