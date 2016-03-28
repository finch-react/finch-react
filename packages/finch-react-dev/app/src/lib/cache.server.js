let store = {};

async function setItem(name, value) {
  store[name] = value;
}

async function getItem(name) {
  return store[name];
}

export default {
  setItem,
  getItem
}
