# easy\_kafka\_example

Kafka Wrapper Usage Example with `easy_kafkajs`

이 리포지토리는 [`easy_kafkajs`](https://github.com/shyswy/easy_kafka) 모듈을 활용하여 Kafka Producer 및 Consumer를 구성한 예시 프로젝트입니다. 간단한 설정만으로 Kafka 메시지를 발송하고 수신할 수 있도록 구조화되어 있습니다.

## 📁 프로젝트 구조

```
consumer/
├── issue.js            # issue 토픽에 대한 Kafka Consumer 핸들러 정의

producer/
├── init.js             # Kafka Producer 초기화 및 메시지 전송 함수 정의

kafkaHandler/
├── consumer/
│   └── issue.js        # easy_kafkajs 기반의 KafkaConsumer 추상화 설정
├── producer/
    └── init.js          # easy_kafkajs 기반의 KafkaProducer 추상화 설정
```

## ✨ 주요 기능

* 간단한 설정으로 Kafka 메시지 consume 및 produce 처리 가능
* `easy_kafkajs`의 POST\_COMMIT\_BATCH 전략을 사용한 안정적 consume 처리
* 재사용성과 확장성이 높은 구조 설계

## 🔧 설치 및 실행

```bash
npm install
```

## 🧩 사용 예시

### ✅ Consumer 실행 예시

`consumer/issue.js`

```js
const consumer = require('./consumer/issue');
await consumer.init();
// 종료 시
await consumer.shutdown();
```

### ✅ Producer 사용 예시

`producer/init.js`

```js
const producer = require('./producer/init');
await producer.init();
await producer.sendMessage([
  { key: 'key1', value: 'message1' },
  { key: 'key2', value: 'message2' }
], 'test-issue');
await producer.shutdown();
```

## ⚙️ 주요 설정 설명

### Consumer 설정: `kafkaHandler/consumer/issue.js`

```js
const consumer = new KafkaConsumer({
  topicConfigs: { topics: ['test-issue'], fromBeginning: false },
  consumeMethod: processMessageFromKafka,
  brokerAddresses: [...],
  clientId: '...',
  authObj: { ... },
  consumerGroupName: 'ISSUE-CONSUMER-<UUID>',
  crashCallback: () => {},
  CONSUME_TYPE: CONSUME_TYPE.POST_COMMIT_BATCH,
});
```

### Producer 설정: `kafkaHandler/producer/init.js`

```js
const producer = new KafkaProducer({
  brokerAddresses: [...],
  clientId: '...',
  authObj: { ... },
  errorCallback: () => {},
});
```

## 📌 의존 모듈

* [easy\_kafkajs](https://github.com/shyswy/easy_kafka)
* kafkajs
* uuid

## 📎 참고

* Kafka broker, client ID 및 인증 관련 설정은 `kafkaHandler/constant.js` 등을 통해 정의되어 있다고 가정합니다.

---

보다 복잡한 use-case 혹은 확장된 설정은 [`easy_kafkajs`](https://github.com/shyswy/easy_kafka) 공식 리포지토리를 참고해주세요.
