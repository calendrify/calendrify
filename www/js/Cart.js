class Cart {
  constructor(name, items) {
    this.name = name;
    this.cartItems = [];

    // Create a number formatter
    this.sweNumFormatter = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0
    });

    // Create the cart items
    if (items) {
      for (let item of items) {
        this.cartItems.push(new CartItem(item.id, item.units));
      } //for  item...
    } // if items...
  } // constructor

  /**
   * Adds a cart item to the current cart.
   * If the item already exist, increase the item count instead
   * @param {*} item A Product-object to store.
   * @param {*} units How many units are being bought
   */
  add(item, units) {
    // Check to see if the cart item already exists in the cart
    let cartItem = this.getItem(item.id);

    // If it doesn't, create a new cart item and add it to the list
    if (!cartItem) {
      let cItem = new CartItem(item.id, units);

      this.cartItems.push(cItem);
    } else {
      // Oh, it does exist... increase the unit count then
      cartItem.units++;
    } // else
  } // add

  clearCart() {
    this.cartItems = [];
  } // clearCart

  getItems() {
    return this.cartItems;
  } // getItems

  getItem(prodNr) {
    return this.cartItems.find(i => i.id == prodNr);
  } // getItem

  updateItem(prodNr, item) {
    let index = this.cartItems.findIndex(i => i.id == prodNr);
    this.cartItems[index] = item;
  } // updateItem

  removeItem(prodNr) {
    const index = this.cartItems.findIndex(i => i.id == prodNr);
    this.cartItems.splice(index, 1);
  } // removeItem

  /**
   * Returns the total number of items in the cart, and NOT the unique products
   * @returns {number} Number of total items.
   */
  getNumberOfItems() {
    let itemCount = 0;
    for (let item of this.cartItems) itemCount += item.units;
    return itemCount;
  } // getNumberOfItems

  /**
   * Returns the total weight for all items in the cart
   * @returns {number} The total weight of all of the items.
   */
  getTotalWeight(products) {
    let totalWeight = 0;
    for (let item of this.cartItems) {
      let pItem = products.find(i => i.id == item.id);
      totalWeight += pItem.weight * item.units;
    } // for item...

    return totalWeight;
  } //getTotalWeight

  /**
   * Returns total price  and total amount saved with 3 for 2 discount without shipping costs
   * @returns {object} The total price with discount and total saved amount for all the items.
   */
  getTotalPrice(products) {
    let totalPrice = 0;
    let totalSaved = 0;

    for (let item of this.cartItems) {
      let itemPrice = item.getRowTotal(products);
      totalPrice += itemPrice.totalPrice;
      totalSaved += itemPrice.totalSaved;
    } //for item...

    return { totalPrice: totalPrice, totalSaved: totalSaved };
  } // getTotalPrice

  /**
   * Returns the value associated with a given key.
   * @param {*} prodNr Product id of item to retrieve.
   * @returns {CartItem} Found value or null.
   */
  get(prodNr) {
    return this.cartItems.find(item => item.id == prodNr);
  } // get

  updateTotals(products) {
    let totPrice = this.getTotalPrice(products);
    let totWeight = this.getTotalWeight(products);
    let shipping = totWeight * 40;
    let grandTot = shipping + totPrice.totalPrice;

    $("#sum").text(this.sweNumFormatter.format(totPrice.totalPrice) + " kr");
    $("#shipping").text(this.sweNumFormatter.format(shipping) + " kr");
    $("#grand-total").text(this.sweNumFormatter.format(grandTot) + " kr");
    $("#vat").text(this.sweNumFormatter.format(grandTot * 0.25) + " kr");
    $("#saved").text(totPrice.totalSaved + " kr");
  } // updateTotals

  render(products) {
    // Render all items in the current cart to a web page
    let str = "";

    if (this.cartItems.length === 0) {
      str += "<div>Varukorgen är tom!</div>";
    } else {
      // Notice the "loop" using the array map method
      str += /*html */ `
      <section class="row font-weight-bold">
        <section class="text-primary col-lg-3 offset-md-2 d-none d-md-block">
          <p class="mb-1">Produkt</p>
        </section>
        <section class="text-primary col-8 col-lg-4 text-right d-none d-md-block">
          <p class="mb-1">Pris</p>
        </section>
        <section class="text-primary col-1 col-lg-2 text-right d-none d-md-block">
          <p class="mb-1">Summa</p>
      </section>
      </section>
      <hr class="mt-0 mb-2 d-none d-md-block"/>
      ${this.cartItems.map(item => item.render(products)).join("")}`;

      str += "<hr class='mt-2 mb-0 d-none d-md-block'/>";

      if (str.includes("discounted")) {
        str +=
          /*html*/
          `<section class="row small">
              <section class="col">
                <p class='mb-0'><span class="text-primary font-weight-bold">*</span> = Ingår i 3-för-2 erbjudandet</p>
              </section>
            </section>`;
      } // if discounted...

      str += /*html*/ `<section class="row">
                    <section class="col-6 col-lg-9 text-left text-lg-right">
                      <p class='mb-1'>Summa</p>
                    </section>
                    <section class="col-6 col-lg-2 text-right">
                      <p class='mb-1' id='sum'></p>
                    </section>
                  </section>`;

      str += /*html*/ `<section class="row">
         <section class="col-6 col-lg-9 text-left text-lg-right">
           <p class='mb-1'>Frakt</p>
         </section>
         <section class="col-6 col-lg-2 text-right">
           <p class='mb-1' id='shipping'></p>
         </section>
       </section>`;

      str += /*html*/ `<section class="row font-weight-bold">
            <section class="col-6 col-lg-9 text-left text-lg-right">
              <p class='mb-1'>Totalsumma</p>
            </section>
            <section class="col-6 col-lg-2 text-right">
              <p class='mb-1' id='grand-total'></p>
            </section>
          </section>`;

      str += /*html*/ `<section class="row small">
          <section class="col-6 col-lg-9 text-left text-lg-right">
            <p class='mb-1'>Varav moms</p>
          </section>
          <section class="col-6 col-lg-2 text-right">
            <p class='mb-1' id='vat'></p>
          </section>
          </section>`;

      if (str.includes("discounted")) {
        str += /*html*/ `<section class="row small">
            <section class="col-6 col-lg-9 text-left text-lg-right">
              <p class='mb-0'>Du sparar</p>
            </section>
            <section class="col-6 col-lg-2 text-right">
              <p class='mb-0' id='saved'></p>
            </section>
          </section>`;
      }

      let emptyString = this.name === "default" ? "Töm" : "Radera";

      str +=
        // <form id="cart-form">
        /*html*/
        `<section class="row mt-1">
            <section class="col-6 mt-4 mt-lg-0 col-lg-2 order-3 order-lg-1">
                <button class="btn btn-primary btn-save-cart" href="">Spara varukorg</button>
            </section>
            <section class="col-6 mt-4 mt-lg-0 col-lg-3 w-100 pl-0 order-4 order-lg-2">
                <input type="text" id="input-cart-name" class="form-control" placeholder="Ange namn på varukorg" required>
            </section>
            <section class="col-12 mt-1 mt-lg-0 col-lg-2 text-left text-lg-right order-5 order-lg-3">
                <button class="btn btn-primary btn-empty-cart" href="">${emptyString} varukorg</button>
            </section>
            <section class="col-6 col-lg-2 text-left text-lg-right order-1 order-lg-4">
              <a class="btn btn-primary" href="#produkter">Fortsätt handla</a>
            </section>
            <section class="col-6 col-lg-2 text-right mx-0 order-2 order-lg-5">
               <a href="#addressform"><button class="btn btn-primary" id="order-button">Beställ</button></a>
            </section>
          </section>`;
    } // else

    return str;
  } // render

  renderInDropDown(products) {
    let str = /*html*/ `
        <p class="mt-1 mb-0 text-center text-primary">
          Aktiv varukorg: <span class="font-italic">${this.name}</span>
        </p>`;

    if (this.cartItems.length === 0) {
      $("#cart-menu").html(
        str +
          /*html*/
          `<li><a class="text-center" href="#produkter"><button class="btn btn-primary w-100">Varukorgen är tom!</button></a></li>`
      );
    } else {
      $('[data-toggle="tooltip"]').tooltip("dispose");
      $("#cart-menu").html(
        str +
          this.cartItems.map(item => item.renderInDropDown(products)).join("") +
          `<span class="cart-sum">Summa: </span><span class="cart-sum-right">${this.sweNumFormatter.format(
            this.getTotalPrice(products).totalPrice
          )} kr</span>` +
          /*html*/ `
          <p class="small my-0 shipping">Priset ink. moms, ex. frakt</p>
          <hr class="item-separator" />
          <li>
            <a class="text-center" href="#cart">
              <button class="btn btn-primary w-100">Gå till varukorg</button>
            </a>
          </li>`
      );

      $('[data-toggle="tooltip"]').tooltip();
    } // else
  } // renderInDropDown
} // Cart
