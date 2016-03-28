async function setItem(name, value) {
  if ('localStorage' in window) {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    return null;
  }
}

async function getItem(name) {
  if ('localStorage' in window) {
    try {
      return JSON.parse(localStorage.getItem(name));
    } catch (e) {
      console.error(e);
      return null;
    }
  } else {
    return null;
  }
}

export default {
  setItem,
  getItem
}
