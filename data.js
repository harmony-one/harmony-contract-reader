const ETHERSCAN_API_KEY = 'H9Q2BDA55J85PISTNG8BDM5IKD4MGTUVW4';
const ALCHEMY_API_KEY = 'FY6BwiO9_hzVN4N2Fx8Ti-BeukyI2XiM';

const _web3Instance = {};
let _contractInstance;

async function dataFetchAbi(contractAddress, network) {
  if (!contractAddress) {
    throw new Error('Contract address is empty.');
  }
  if (!contractAddress.startsWith('one1')) {
    throw new Error('Contract address does not start with "one1".');
  }
  if (contractAddress.length != 42) {
    throw new Error('Contract address should be 20 bytes.');
  }
  const abiReq = await fetch(
    `https://ctrver.t.hmny.io/fetchContractCode?contractAddress=${contractAddress}`
  );

  if (abiReq.status === 200) {
    let json = await abiReq.json()
    return json.abi
  } else {
    throw new Error('ABI not found.');
  }
}

function dataEncodeFunctionSignature(abiField, network) {
  return _getWeb3(network).eth.abi.encodeFunctionSignature(abiField);
}

function dataInitializeContractInstance(contractAddress, network, abi) {
  let ethContractAddress = fromBech32(contractAddress)
  _contractInstance = new (_getWeb3(network).eth.Contract)(abi, ethContractAddress);
}

async function dataQueryFunction(abiField, inputs, blockNumber, from) {
  return _contractInstance.methods[abiField.name](...inputs).call();
}

function dataValidateType(type, value) {
  if (value === '') {
    throw new Error('Value is empty.');
  }
  if (type === 'address') {
    if (!value.startsWith('one1')) {
      throw new Error('Value does not start with one1.');
    }
    if (value.length != 42) {
      throw new Error('Value should be 20 bytes.');
    }
  }
}

function _getWeb3(network) {
  if (!_web3Instance[network]) {
    _web3Instance[network] = new Web3(`https://api.harmony.one`);
  }
  return _web3Instance[network];
}
