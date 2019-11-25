class CartManager {
  constructor() {
    this.items = [];
    this.update();
  }

  /**
   * Adds a cart item to the cart.
   * @param {*} item A Product-object to store.
   * @param {*} units How many units are being bought
   */
  add(item, units) {
    let cItem = new CartItem(
      item.id,
      // item.name,
      // item.description,
      units,
      false,
      0
      // item.price,
      // item.discount,
      // item.weight,
      // item.image
    );

    this.items.push(cItem);
    this.save();
  } // add

  /**
   * Saves the cart to local storage.
   */
  save() {
    store.cartItems = JSON.stringify(this.items);
    store.save();
  } // save

  /**
   * Loads the cart items from the cart and create the internal list with cart items.
   */
  update() {
    const list = store.cartItems;
    this.items =
      list == undefined
        ? []
        : JSON.parse(list).map(
            item =>
              new CartItem(
                item.productId,
                // item.name,
                // item.description,
                item.units,
                true,
                item.cartId
                // item.pricePerUnit,
                // item.discount,
                // item.weightPerUnit,
                // item.url
              )
          );
  } // update

  /**
   * Update an item in the cart.
   * @param {*} itemNr the id of the item to update
   * @param {*} item The item fo put in the cart
   */
  updateItem(itemNr, item) {
    this.update();
    const idx = this.items.findIndex(item => item.id == itemNr);
    this.items[idx] = item;
    this.save();
  } // updateItem
  /**
   * Removes and item from the cart
   * @param {*} itemNr Id of item to remove
   */
  removeItem(itemNr) {
    this.update();
    const idx = this.items.findIndex(item => item.id == itemNr);
    this.items.splice(idx, 1);
    this.save();
  } // removeItem

  /**
   * Returns the value associated with a given key.
   * @param {*} itemNr Item to retrieve.
   * @returns {CartItem} Found value or null.
   */
  get(itemNr) {
    this.update();
    return this.items.find(item => item.id == itemNr);
  } // get

  /**
   * Clear the cart and saves the empy one
   */
  clearCart() {
    store.cartItems = null;
    store.uniqueId = null;
    store.save();
  } // clearCart

  /**
   * Returns the total number of items in the cart, and NOT the unique products
   */
  getNumberOfItems() {
    this.update();
    let itemCount = 0;
    for (let item of this.items) itemCount += item.units;
    return itemCount;
  } // getNumberOfItems

  /**
   * Returns the list of items in the cart
   */
  getItems() {
    this.update();
    return this.items;
  } // getItems
} // CartManager

// Load the currently last used unique id
CartItem.uniqueId = Number(store.uniqueId || 0);
