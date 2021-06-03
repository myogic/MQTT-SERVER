db.sensordatas.aggregate([{
    $group:{
    _id: "$deviceName",
    avgTemp : {$avg: "$Temperature"}
    }
    }
])

// View ISO DATE
db.sensordatas.aggregate([
     { $project: 
        { year: {$year: "$createdAt"}, 
        month: {$month : "$createdAt"},
        day: {$dayOfMonth: "$createdAt"}, 
        _id: "$id",
         value: "$Temperature" 
        } 
    } 
])

/// Data
db.sensordatas.aggregate([
    {$project: 
        {
            date: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
            keyValue: 1,
            Temperature: "$Temperature"
    }},
{$group: {
    _id: '$date',
    avg: {$avg: '$Temperature'}
    }}
])

db.sensordatas.aggregate([
    {$project: 
        {
            date: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
            keyValue: 1,
            Temperature: "$Temperature",
            Humidinity: "$Humidinity",
            SoilMoinsture: "$SoilMoinsture",
            LightSensor: "$LightSensor"
    }},
{$group: {
    _id: '$date',
    avgTemp : {$avg: '$Temperature'},
    avgHum: {$avg: '$Humidinity'},
    avgSoil: {$avg: '$SoilMoinsture'},
    avgLight: {$avg: '$LightSensor'}
    }}
])



