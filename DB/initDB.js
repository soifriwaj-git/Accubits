const mongoose = require('mongoose');

function initDB() {
    const promise = new Promise((resolve, reject) =>
    {
        mongoose.connect(`mongodb://${process.env.MONGODB_SERVER}:${process.env.MONGODB_PORT}/${process.env.DB}`);
    });
    return promise;
}

module.exports= initDB;