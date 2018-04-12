const Fetch = (function () {
  return {
    get(endpoint, callback) {
      fetch(endpoint)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error(`${res.status}-${res.statusText}`);
        })
        .then((json) => {
          if (typeof callback === 'function') {
            return callback(json);
          }
          return json;
        })
        .catch(err => console.log(err));
    }
  };
}());

export default Fetch;
