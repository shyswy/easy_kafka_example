const BROKER_ADDRESS = 'brokerAddress';
const MECHANISM = 'mechanism';
const USERNAME = 'username';
const PASSWORD = 'password';
const CLIENT_ID = 'mb-app';

const BROKER_LIST = (() => {
  return [BROKER_ADDRESS];
})();
const NEED_AUTH = process?.env?.STAGE && process?.env?.STAGE !== 'local';
const DEFAULT_AUTH_OBJ = {
  mechanism: MECHANISM,
  username: USERNAME,
  password: PASSWORD,
};
const KAFKA_AUTH_OBJ = NEED_AUTH ? DEFAULT_AUTH_OBJ : false;

module.exports = {
  KAFKA_AUTH_OBJ,
  CLIENT_ID,
  BROKER_LIST,
};
