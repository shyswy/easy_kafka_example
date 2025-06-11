/* eslint-disable node/no-unpublished-require */
const issueConsumer = require('../kafkaHandler/consumer/issue');
const { v4: uuidv4 } = require('uuid');
const INSTANCE_ID = uuidv4();
const ConsumerGroupId = `ISSUE-CONSUMER-${INSTANCE_ID}`;
const processMessageFromKafka = async (messages) => {
  const parsedMessages = messages.map((message) => JSON.parse(message.value.toString()));
  console.log('consumed:', parsedMessages);
};

async function init() {
  const crashCallback = async () => {
    console.log('[Kafka Crash Callback] Start');
  };
  await issueConsumer.init(processMessageFromKafka, ConsumerGroupId, crashCallback);
}
async function shutdown() {
  await issueConsumer.shutdown();
}

module.exports = {
  init,
  processMessageFromKafka,
  shutdown,
};
