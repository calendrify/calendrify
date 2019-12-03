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

let order;
try {
  order = JSON.parse(localStorage.order);
} catch (e) {
  order = {};
}

order.save = function() {
  localStorage.order = JSON.stringify(this);
};

let lastOrderId;
try {
  lastOrderId = JSON.parse(localStorage.lastOrderId);
} catch (e) {
  lastOrderId = {};
}

lastOrderId.save = function() {
  localStorage.lastOrderId = JSON.stringify(this);
};
