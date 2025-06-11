const issueConsumer = require('./consumer/issue');
const issueProducer = require('./producer/init');

const abnormalSignalTraps = ['SIGINT', 'SIGUSR1', 'SIGUSR2'];
abnormalSignalTraps.forEach((type) => {
  process.once(type, async (exitCode) => {
    console.log(`signalTraps, exitCode: ${exitCode}`);
    if (exitCode || exitCode === 0) {
      await issueConsumer.shutdown();
      await issueProducer.shutdown();
    }
  });
});

async function start() {
  issueConsumer.init();
  issueProducer.init();
  testData = { msg: 'hello' };
  const testMsg = { value: JSON.stringify(testData) };
  setTimeout(() => issueProducer.sendMessage([testMsg], 'test-issue'), 10000);
}
start();
