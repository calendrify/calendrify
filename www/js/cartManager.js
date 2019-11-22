class CartManager {
  constructor() {
    this.items = [];
    this.update();
  }

  /**
   * Adds a cart item to the cart.
   * @param {*} item A Product-object to store.
   */
  add(item, units) {
    let cItem = new CartItem(
      item.id,
      item.name,
      item.description,
      units,
      item.price,
      item.discount,
      item.weight,
      item.image
    );
    this.items.push(cItem);
    this.save();
  }

  save() {
    store.cartItems = JSON.stringify(this.items);
    store.save();
  }

  update() {
    const list = store.cartItems;
    this.items =
      list == undefined
        ? []
        : JSON.parse(list).map(
            item =>
              new CartItem(
                item.productId,
                item.name,
                item.description,
                item.units,
                item.pricePerUnit,
                item.discount,
                item.weightPerUnit,
                item.url
              )
          );
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

  getItems() {
    this.update();
    return this.items;
  }
}

CartItem.uniqueId = Number(store.uniqueId || 0);

// let cartManager = new CartManager();
