let store;
try {
  store = JSON.parse(localStorage.store);
} catch (e) {
  store = {};
}

store.save = function() {
  localStorage.store = JSON.stringify(this);
};

let address;
try {
  address = JSON.parse(localStorage.address);
} catch (e) {
  address = {};
}

address.save = function() {
  localStorage.address = JSON.stringify(this);
};
