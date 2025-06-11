/* eslint-disable indent */
const { KafkaConsumer, CONSUME_TYPE } = require('easy_kafkajs');
const { BROKER_LIST, CLIENT_ID, KAFKA_AUTH_OBJ } = require('../constant');

const ISSUE_TOPIC_NAME = 'test-issue';

const TOPIC_CONFIGS = {
  topics: [ISSUE_TOPIC_NAME],
  fromBeginning: false,
};

/**
 * 소비자 인스턴스
 * @type {KafkaConsumer}
 */
let consumer = false;

async function shutdown() {
  if (!consumer) {
    return false;
  }
  return consumer.shutdown();
}

async function init(processMessageFromKafka, consumerGroupId, crashCallback = () => {}) {
  consumer = new KafkaConsumer({
    topicConfigs: TOPIC_CONFIGS,
    consumeMethod: processMessageFromKafka,
    brokerAddresses: BROKER_LIST,
    clientId: CLIENT_ID,
    authObj: KAFKA_AUTH_OBJ,
    consumerGroupName: consumerGroupId,
    // kafka에서 non Retriable error 발생 시, handler 등록( 이 상황에서 가끔 consumer disconnect 후 reconnect X 하여 silent하게 consumer만 serve되지 않는 이슈가 있다. )
    // 보통 이 상황에선 consumer가 맛이 간 것이기 때문에 shutdown을 crashCallback으로 등록 권장.
    crashCallback,
    // batch consume에서 consume 정책
    CONSUME_TYPE: CONSUME_TYPE.POST_COMMIT_BATCH,
  });

  await consumer.init({
    groupId: consumerGroupId,
    heartbeatInterval: 30000,
    sessionTimeout: 90000,

    // batch 사이즈 관련
    maxWaitTimeInMs: 5000, // 브로커가 데이터를 반환하기 전에 대기할 최대 시간 ( min byte 충족 x 여도 이 안에는 반환.)
    maxBytesPerPartition: 1048576, // maximum amount of data per-partition the server will return:1Byte
    minBytes: 1, // 브로커가 클라이언트에게 데이터를 반환하기 전에 수집해야 하는 최소 바이트 수
    maxBytes: 10485760, // Maximum amount accumulate in Response 10MB
    retry: 5,
  });
}

module.exports = {
  init,
  shutdown,
};
