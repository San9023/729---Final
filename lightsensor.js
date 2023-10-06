const mongoose = require('mongoose');
const Sensor = require('./models/sensor');
const plotly = require('plotly')("San9023", "zd6YTZVJSE2MJkSpPRTE");

const data = {
  x: [],
  y: [],
  type: "scatter"
};

mongoose.connect('mongodb+srv://s222434398:iamsan9023@sit729.skfp52e.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

function sensortest() {
    const sensordata = {
      device_id: "12345",
      status: "ON",
      brightness: 80,
      color: "#FFFFFF",
      time: Date.now()
    };
  
    // Log the sensordata object before saving it
    console.log("Sensor data to be saved:", sensordata);
  
    const newSensor = new Sensor({
      device_id: sensordata.device_id,
      status: sensordata.status,
      brightness: sensordata.brightness,
      color: sensordata.color,
      time: sensordata.time
    });
  
    let starttime = Date.now();
  
    newSensor.save()
      .then(doc => {
        console.log(doc);
        let endTime = Date.now();
        let elapsedTime = endTime - starttime;
        console.log("Time Taken to store the sensordata: " + elapsedTime + "ms");
      })
      .catch(error => {
        console.error('Error saving Sensor document:', error);
      });
  }
  
  
  
setInterval(sensortest, 10000); //time is in ms
