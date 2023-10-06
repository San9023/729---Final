const mqtt = require('mqtt');

// MQTT broker connection details
const brokerUrl = 'mqtt://broker.hivemq.com:1883';

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('MQTT connected');

  // Define the LED data
  const leds = [
    { id: 1, name: 'led1', intensity: 100 },
    { id: 2, name: 'led2', intensity: 200 },
    { id: 3, name: 'led3', intensity: 150 },
    { id: 4, name: 'led4', intensity: 250 },
  ];

  // Publish LED data for each LED
  leds.forEach(led => {
    ledPublish(led.id, led.name, led.intensity);
  });
});

function ledPublish(id, name, intensity) {
  // Define the topic using template literals
  const topic = `led/${id}/${name}/intensity`;

  // Convert intensity to a string
  const message = String(intensity);

  // Publish the message
  client.publish(topic, message);

  console.log(`LED ID: ${id}, Name: ${name} has published on topic ${topic} with intensity: ${message}`);
}

// Handle incoming messages (if needed)
client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
