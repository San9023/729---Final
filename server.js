const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

let ledsDown = 0; // Initialize the counter for LEDs with intensity less than 100 nits

client.on('connect', () => {
  console.log('MQTT connected');

  // Subscribe to all LED intensity topics
  client.subscribe('led/+/+/intensity', (err) => {
    if (!err) {
      console.log('Subscribed to all LED intensity topics');
    } else {
      console.error('Subscription error', err);
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log("Topic is: " + topic);
  console.log("Intensity is: " + message);

  // Check if the intensity is less than or equal to 100
  if (parseInt(message) <= 100) {
    ledsDown++;
    console.log("ledsDown " + ledsDown);
  }

  // Check if more than two devices have intensities less than 100 nits
  if (ledsDown > 1) {
    console.log("More than two devices have less intensities than 100 nits");
  }

  ledsDown = 0; // Reset the counter for the next set of messages
});
