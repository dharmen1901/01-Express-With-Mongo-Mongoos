const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    data :{
      type : String,
    }
},{timestamp:true})

const record = mongoose.model('Record',recordSchema);

module.exports = record;