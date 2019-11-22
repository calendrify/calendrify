class CartItem {
  constructor(desc, units, ppu, discounted) {
    this.description = desc;
    this.units = units;
    this.pricePerUnit = ppu;
    this.discouted = discounted;
    this.id = CartItem.uniqueId++;
    store.uniqueId = CartItem.uniqueId;
    // localStorage.setItem("uniqueId", CartItem.uniqueId);
    console.log("Id: ", this.id);
  }
}

class CartManager {
  constructor() {
    this.items = [];
    this.update();
  }

  /**
   * Adds a cart item to the cart.
   * @param {*} item CartItem to store.
   */
  add(item) {
    this.items.push(item);
    this.save();
  }

  save() {
    store.cartItems = JSON.stringify(this.items);
    store.save();
  }

  update() {
    const list = store.cartItems;
    this.items = list == undefined ? [] : JSON.parse(list);
    // this.items = list === null ? [] : JSON.parse(list);
  }

  updateItem(itemNr, item) {
    this.update();
    const idx = this.items.findIndex(item => item.id == itemNr);
    this.items[idx] = item;
    this.save();
  }

  removeItem(itemNr) {
    this.update();
    const idx = this.items.findIndex(item => item.id == itemNr);
    this.items.splice(idx, 1);
    this.save();
  }

  /**
   * Returns the value associated with a given key.
   * @param {*} itemNr Item to retrieve.
   * @returns {CartItem} Found value or null.
   */
  get(itemNr) {
    this.update();
    return this.items.find(item => item.id == itemNr);
  }

  clearCart() {
    store.cartItems = null;
    store.uniqueId = null;
    store.save();
  }

  getNumberOfItems() {
    this.update();
    let itemCount = 0;
    for (let item of this.items) itemCount += item.units;
    return itemCount;
  }
}

CartItem.uniqueId = Number(store.uniqueId || 0);

// let cartManager = new CartManager();
