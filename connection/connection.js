const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:user@sandbox.liaa2.mongodb.net/Greenhouse?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true    
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log("Server Database connected !");
});

