const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'field title harus ada'],
        minlength: 3,
        maxlength: 50,
    },
    description:{
        type: String
    },
},
{
    timestamps: true
});

const Journal = mongoose.model('journal', journalSchema);

module.exports = Journal;