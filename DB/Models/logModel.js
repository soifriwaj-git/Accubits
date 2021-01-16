const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    content: String,
    sentTo : String,
    createdAt: Date
});

const logModel = mongoose.model('Log', logSchema);

module.exports= logModel;