class CartManager {
  constructor() {
    this.items = [];
    this.load();
  } // constructor

  /**
   * Adds a cart item to the cart.
   * If the item already exist, increase the item count instead
   * @param {*} item A Product-object to store.
   * @param {*} units How many units are being bought
   */
  add(item, units) {
    // Check to see if the cart item already exists in the cart
    let cartItem = this.get(item.id);

    // If it doesn't, create a new cart item and add it to the list
    if (!cartItem) {
      let cItem = new CartItem(item.id, units);

      this.items.push(cItem);
    } else {
      // Oh, it does exist... increase the unit count then
      cartItem.units++;
    } // else

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
   * Loads the cart items from the cart and create the internal list of cart items.
   */
  load() {
    const list = store.cartItems;
    this.items =
      list == undefined
        ? []
        : JSON.parse(list).map(item => new CartItem(item.id, item.units));
  } // load

  /**
   * Update an item in the cart.
   * @param {*} prodNr the id of the item to update
   * @param {*} item The updated item to put in the cart
   */
  updateItem(prodNr, item) {
    const idx = this.items.findIndex(item => item.id == prodNr);
    this.items[idx] = item;
    this.save();
  } // updateItem

  /**
   * Removes and item from the cart
   * @param {*} prodNr Id of item to remove
   */
  removeItem(prodNr) {
    const idx = this.items.findIndex(item => item.id == prodNr);
    this.items.splice(idx, 1);
    this.save();
  } // removeItem

  /**
   * Returns the value associated with a given key.
   * @param {*} prodNr Product id of item to retrieve.
   * @returns {CartItem} Found value or null.
   */
  get(prodNr) {
    return this.items.find(item => item.id == prodNr);
  } // get

  /**
   * Clear the cart and saves the empy one
   */
  clearCart() {
    store.cartItems = null;
    store.save();
    this.load();
  } // clearCart

  /**
   * Returns the total number of items in the cart, and NOT the unique products
   * @returns {number} Number of total items.
   */
  getNumberOfItems() {
    let itemCount = 0;
    for (let item of this.items) itemCount += item.units;
    return itemCount;
  } // getNumberOfItems

  /**
   * Returns the total weight for all items in the cart
   * @returns {number} The total weight of all of the items.
   */
  getTotalWeight(products) {
    let totalWeight = 0;
    for (let item of this.items) {
      let pItem = products.find(i => i.id == item.id);
      totalWeight += pItem.weight * item.units;
    }
    return totalWeight;
  } //getTotalWeight

  /**
   * Returns total price  and total amount saved with 3 for 2 discount without shipping costs
   * @returns {object} The total price with discount and total saved amount for all the items.
   */
  getTotalPrice(products) {
    let totalPrice = 0;
    let totalSaved = 0;

    for (let item of this.items) {
      let itemPrice = item.getRowTotal(products);
      totalPrice += itemPrice.totalPrice;
      totalSaved += itemPrice.totalSaved;
    } //for..

    return { totalPrice: totalPrice, totalSaved: totalSaved };
  } // getTotalPrice

  /**
   * Returns the list of items in the cart
   * @returns {[]} The listof items.
   */
  getItems() {
    return this.items;
  } // getItems
} // CartManager
