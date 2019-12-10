class CartManager {
  constructor() {
    this.carts = [];
    this.products = [];
    this.currentCart = 0;

    // Create a number formatter
    this.sweNumFormatter = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0
    });

    this.load();
    this.addListeners();
  } // constructor

  addListeners() {
    $("body").on("change", "#cart-select", e => {
      this.currentCart = $("#cart-select").val();
      this.renderInDropDown();
      this.render();
      return;
    });

    $("body").on("click", e => {
      let id = this.getCartItemId($(e.target));
      let cartItem = this.getItem(id);

      if (e.target.className.includes("btn-empty-cart")) {
        this.clearCurrentCart();
        this.render();
        this.renderInDropDown();
        this.updateArticleCount();
      } // btn-empty-cart

      if (e.target.className.includes("btn-save-cart")) {
        $("#input-cart-name")[0].setCustomValidity("");

        // Get the name from the user and try to make a clone of the current cart.
        // If the name exists, cloneCart will return false
        let cartName = $("#input-cart-name").val();
        let success = this.cloneCart(cartName);
        if (success) {
          this.renderInDropDown();

          // Are we on the cart page? If so, re-render it
          if (
            $(location)
              .attr("href")
              .includes("#cart")
          )
            this.render();
        } // if success...
        else {
          $("#input-cart-name")[0].setCustomValidity(
            `'${cartName}' är redan taget - vänligen skriv in ett annat namn!`
          );
          $("#input-cart-name")[0].reportValidity();
          $("#input-cart-name").focus();
          $("#input-cart-name").select();
        } // else

        return;
      } // btn-save-cart

      if (
        e.target.className.includes("btnPlus") ||
        $(e.target)
          .parent()
          .hasClass("btnPlus")
      ) {
        $('[data-toggle="popover"]').popover("dispose");

        cartItem.units++;
        this.updateItem(id, cartItem);

        cartItem.updateUnitsAndSum(this.products);
        this.updateTotals();

        this.renderInDropDown();
        this.updateArticleCount();

        return;
      } // btnPlus

      if (
        e.target.className.includes("btnMinus") ||
        $(e.target)
          .parent()
          .hasClass("btnMinus")
      ) {
        $('[data-toggle="popover"]').popover("dispose");

        // Does the cart item have any items at more than one unit?
        if (cartItem.units > 1) {
          cartItem.units--;
          this.updateItem(id, cartItem);

          cartItem.updateUnitsAndSum(this.products);
          this.updateTotals();

          this.renderInDropDown();
          this.updateArticleCount();
        } // if cartItem...

        return;
      } // btnMinus

      if (
        e.target.className.includes("btnDelete") ||
        $(e.target)
          .parent()
          .hasClass("btnDelete")
      ) {
        this.removeItem(id);
        this.render();
        this.renderInDropDown();
        this.updateArticleCount();

        return;
      } // btnDelete

      if (
        e.target.className.includes("trash-button") ||
        $(e.target)
          .parent()
          .hasClass("trash-button")
      ) {
        e.preventDefault();

        $('[data-toggle="tooltip"]').tooltip("dispose");

        this.removeItem(id);
        this.renderInDropDown();
        this.updateArticleCount();

        // Are we on the cart page? If so, re-render it
        if (
          $(location)
            .attr("href")
            .includes("#cart")
        )
          this.render();

        return;
      } // trash-button

      $('[data-toggle="popover"]').each(function() {
        $(this).popover("dispose");
      });
    });
  } // addListeners

  setProducts(products) {
    this.products = products;
  } // setProducts

  getCartItemId(target) {
    return target.closest(".cart-item").attr("id");
  } // getCartItemId

  /**
   * Adds a cart item to the current cart.
   * If the item already exist, increase the item count instead
   * @param {*} item A Product-object to store.
   * @param {*} units How many units are being bought
   */
  add(item, units) {
    this.carts[this.currentCart].add(item, units);
    this.save();
  } // add

  /**
   * Saves the carts to local storage.
   */
  save() {
    store.multiCart = JSON.stringify(this.carts);
    store.save();
  } // save

  /**
   * Loads all the carts from the local storage.
   */
  load() {
    const list = store.multiCart;
    if (list == undefined) {
      this.carts.push(new Cart("default", null));
    } else {
      this.carts = JSON.parse(list).map(
        item => new Cart(item.name, item.cartItems)
      );
    } // else
  } // load

  cloneCart(name) {
    if (!this.getCartNames().includes(name)) {
      let newCartList = JSON.parse(
        JSON.stringify(this.carts[this.currentCart])
      );

      let newCart = new Cart(name, newCartList.cartItems);
      this.carts.push(newCart);
      this.currentCart = this.carts.length - 1;
      this.save();

      return true;
    } else return false;
  } // cloneCart

  /**
   * Returns the list of carts in the cart manager
   * @returns {[]} The list of carts.
   */
  getCarts() {
    return this.carts;
  } // getCarts

  getCartNames() {
    return this.carts.map(cart => cart.name);
  } // getCartNames

  /**
   * Update an item in the currently active cart.
   * @param {*} prodNr the id of the item to update
   * @param {*} item The updated item to put in the cart
   */
  updateItem(prodNr, item) {
    this.carts[this.currentCart].updateItem(prodNr, item);
    this.save();
  } // updateItem

  /**
   * Removes and item from the currently active cart
   * @param {*} prodNr Id of item to remove
   */
  removeItem(prodNr) {
    this.carts[this.currentCart].removeItem(prodNr);
    this.save();
  } // removeItem

  /**
   * Returns the value associated with a given key.
   * @param {*} prodNr Product id of item to retrieve.
   * @returns {CartItem} Found value or null.
   */
  getItem(prodNr) {
    return this.carts[this.currentCart].getItem(prodNr);
  } // getItem

  /**
   * Clear the current cart
   * Sets the current cart to the first
   */
  clearCurrentCart() {
    if (this.currentCart == 0) {
      this.carts[this.currentCart].clearCart();
    } // if currentCart... default cart
    else {
      this.carts.splice(this.currentCart, 1);
      this.currentCart = 0;
    } // else, not the default cart

    this.save();
  } // clearCart

  /**
   * Returns the total number of items in the current cart, and NOT the unique products
   * @returns {number} Number of total items.
   */
  getNumberOfItems() {
    return this.carts[this.currentCart].getNumberOfItems();
  } // getNumberOfItems

  /**
   * Returns the total weight for all items in the cart
   * @returns {number} The total weight of all of the items.
   */
  getTotalWeight() {
    return this.carts[this.currentCart].getTotalWeight(this.products);
  } //getTotalWeight

  /**
   * Returns total price  and total amount saved with 3 for 2 discount without shipping costs
   * @returns {object} The total price with discount and total saved amount for all the items.
   */
  getTotalPrice() {
    return this.carts[this.currentCart].getTotalPrice(this.products);
  } // getTotalPrice

  updateTotals() {
    return this.carts[this.currentCart].updateTotals(this.products);
  } // getTotalPrice

  /**
   * Updates the text containing the number of items in the cart
   * @returns {number} Number of total items in the cart.
   */
  updateArticleCount() {
    $("#articles-in-cart").text(
      " " +
        this.sweNumFormatter.format(
          this.carts[this.currentCart].getNumberOfItems()
        )
    );
  } // updateArticleCount

  getCurrentCartItems() {
    return this.carts[this.currentCart].getItems();
  } // getCurrentCartItems

  getCurrentCartName() {
    return this.carts[this.currentCart].name;
  } // getCurretnCartName

  getCartNamesAsOptions() {
    return this.carts
      .map((cart, index) => {
        let str = `<option value=${index}`;

        if (index == this.currentCart) {
          str += " selected";
        } // if index...

        str += `>${cart.name}</option>`;
        return str;
      })
      .join("");
  } // getCartNamesAsOptions

  render() {
    //  <select class="custom-select">
    //    <option>Hej!</option>
    //  </select>;
    let str =
      /*html*/ `
      <section class="row justify-space-between align-items-center">
        <section class="col-12 col-lg-8">
          <h1 class="text-primary my-0">Varukorg</h1>
        </section>
        <section class="col-6 col-lg-2 text-left text-lg-right">
          <span class="text-primary">Aktiv varukorg: </span>
        </section>
        <section class="col-6 col-lg-2">
          <form id='form-select-cart'>
            <select id='cart-select' class='custom-select round'>
              ${this.getCartNamesAsOptions()}
            </select>
          </form>
        </section>
      </section>` + this.carts[this.currentCart].render(this.products);

    $("main").html(str);
    this.updateTotals();
    this.updateArticleCount();
  } // render

  renderInDropDown() {
    this.carts[this.currentCart].renderInDropDown(this.products);
  } // renderInDropDown
} // CartManager
