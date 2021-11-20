const nsq = require('nsqjs')
const dotEnv = require("dotenv");

dotEnv.config();
const host = process.env.HOST || 'localhost';
const port = process.env.NSQD_PORT || '4150';
const topic = process.env.TOPIC || 'test_topic';

const writer = new nsq.Writer(host, port);

writer.connect()

writer.on('ready', () => {
  const message = {
    status: 200,
    title: "Welcome",
    message: "Hello There !!"
  };
  
  writer.publish(topic, message, err => {
    if (err) { return console.error(err.message) }
    console.log('Message sent successfully')
    writer.close()
  });
});

writer.on('closed', () => {
  console.log('Writer closed')
});