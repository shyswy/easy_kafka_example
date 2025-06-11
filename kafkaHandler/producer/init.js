/* eslint-disable indent */
const { KafkaProducer } = require('easy_kafkajs');
const { BROKER_LIST, CLIENT_ID, KAFKA_AUTH_OBJ } = require('../constant');

/**
 * 소비자 인스턴스
 * @type {KafkaProducer}
 */
let producer = false;

async function shutdown() {
  if (!producer) {
    return false;
  }
  return producer?.shutdown();
}

async function init(crashCallback) {
  producer = new KafkaProducer({
    brokerAddresses: BROKER_LIST,
    clientId: CLIENT_ID,
    authObj: KAFKA_AUTH_OBJ,
    errorCallback: crashCallback,
  });
  await producer.start();
}

async function sendMessage(messages, topic) {
  if (!producer) {
    console.log('[producer not exist]');
    return false;
  }
  try {
    console.log('[producer send Start]');
    return producer.send(topic, messages);
  } catch (err) {
    throw new Error(`[Fail sending Message To Kafka] ${err.message}`);
  }
}

module.exports = {
  init,
  sendMessage,
  shutdown,
};
