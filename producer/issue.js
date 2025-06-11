/* eslint-disable node/no-unpublished-require */
const producer = require('../kafkaHandler/producer/init');

async function init() {
  const crashCallback = async () => {
    console.log('[Kafka Crash Callback] Start');
  };
  await producer.init(crashCallback);
}

async function sendMessage(messages, topic) {
  return producer.sendMessage(messages, topic);
}

async function shutdown() {
  await producer.shutdown();
}

module.exports = {
  init,
  sendMessage,
  shutdown,
};
