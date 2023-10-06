const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  device_id: String,
  status: String,
  brightness: Number,
  color: String
});

module.exports = mongoose.model('Sensor', sensorSchema);
