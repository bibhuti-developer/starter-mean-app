const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// below schema is the blueprint of the object in the database.
const videoSchema = new Schema({
    title: String,
    url: String,
    description: String
});

// create model from schema
// video - name of the model
// mongodata - collection name in mongodb
module.exports = mongoose.model('video', videoSchema, 'mongodata');