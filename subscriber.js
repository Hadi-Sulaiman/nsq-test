const nsq = require('nsqjs');
const dotEnv = require("dotenv");

dotEnv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.NSQLOOKUPD_PORT || '4161';
const channel = process.env.CHANNEL || 'test_channel';
const topic = process.env.TOPIC || 'test_topic';

const reader = new nsq.Reader(topic, channel, {
  lookupdHTTPAddresses: host+':'+port
});

reader.connect();

reader.on('message', msg => {
  const message = msg.json();
  console.log('Received message id = [%s]:', msg.id);
  console.log('Title : %s', message.title);
  console.log('Message :%s', message.message);
  msg.finish();
})