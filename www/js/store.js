let store;
try {
  store = JSON.parse(localStorage.store);
} catch (e) {
  store = {};
}

store.save = function() {
  localStorage.store = JSON.stringify(this);
};

// store.addItem = function(key, value) {
//   store.key = value;
//   store.save();
// };
