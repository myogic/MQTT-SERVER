db.sensordatas.aggregate({
       $match: {
           DueDate: {
              $lt: new ISODate()
           }
        }
     }, {
        $group: {
           _id: "$deviceName",
           olderDate: {
              $min: "$DueDate"
           },
           sumValue: {
              $sum: "$Humidinity"
           }
        }
     }, {
     $project: {
        averageValue: {
           $divide: ["$sumValue", {
              $divide: [{
                 $subtract: [new ISODate(), "$olderDate"]
                 }, 1000 * 60 * 60 * 24]
              }]
           }
        }
     })

