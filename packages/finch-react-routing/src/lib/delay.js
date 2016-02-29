export default (ms, response) => new Promise((resolve)=>setTimeout(resolve.bind(this, response), ms));
