/**
 * The class represents an item in the cart.
 * The only values it contains is the product id and the number of units for that item.
 * The actual product information is retrieved through the product id from the products list sent as parameter to the different render methods.
 */

class CartItem {
  constructor(id, units) {
    this.id = id;
    this.units = units;
  } // constructor

  getProduct(products) {
    return products.find(item => item.id == this.id);
  } // getProduct

  /**
   * Renders the cart item in the cart drop down list located in the menu
   * @param {*} products an array of all the products, so we can look up the product info
   * @returns {string} HTML-formatted string.
   */

  renderInDropDown(products) {
    const item = this.getProduct(products);

    return /*html*/ `
    <li class= "cart-item" id=${this.id}>
      <span class="item" data-toggle="tooltip" title="${item.description}" data-placement="left">
        <span class="item-left">
          <img
            src=${item.image}
            alt="" width="50em"
          />
          <span class="item-info small">
            <span>${item.name}</span>
            <span>Antal: ${this.units}</span>
            <span>Pris/st: ${item.price} kr</span>
          </span>
        </span>
        <span class="item-right">
          <button class="btn btn-primary fas fa-trash-alt pull-right trash-button"></button>
        </span>
      </span>
      <hr class="item-separator"/>
    </li>`;
  } // renderInDropDown

  /**
   * Renders the cart item in the cart drop down list located in the menu
   * @param {*} products an array of all the products, so we can look up the product info
   * @returns {string} HTML-formatted string.
   */
  render(products) {
    const item = this.getProduct(products);

    let str = /*html*/ `
        <section class="row cart-item my-1" id=${this.id}>
          <section class="col-1 mb-1 mb-md-0">
            <button class="btn btn-primary btnDelete"><i class="far fa-trash-alt" id="delete-button-${this.id}"></i></button>
          </section>
          <section class="col-10 offset-1 offset-md-0 col-md-4 col-lg-7 align-self-center">
            <p class="m-0" data-toggle="tooltip" title="${item.description}" data-placement="left">${item.name}</p>
          </section>
          <section class="col-7 col-md-3 col-lg-2">
            <span>
              <button class="btn btn-primary btnMinus"><i class="fas fa-minus"></i></button>
            </span>
            <span class="font-weight-bold px-1">
              ${this.units}
            </span>
            <span>
              <button class="btn btn-primary btnPlus" 
                  data-container='body' 
                  data-toggle='popover' 
                  data-placement='right' 
                  data-content='3-för-2 rabatt - om du lägger till en till så blir den gratis!'>
                    <i class="fas fa-plus"></i>
                  </button>
            </span>
          </section>
          <section class="col-1 col-md-2 col-lg-1 text-right align-self-center">
            <p class="m-0">${item.price}`;

    // Is the item discounted (3-for-2): display an asterisk after the price
    if (item.discount) {
      str += "<span class='discounted'>*</span>";
    } // if item...

    str += `</p>
          </section>
          <section class="col-4 col-md-2 col-lg-1 text-right align-self-center">
            <p class="font-weight-bold m-0">`;

    // Add the total item price information
    // Is the item discounted (3-for-2): calculate the discount
    if (item.discount) {
      let totalUnits = 0;
      let totalDiscountUnits = Math.floor(this.units / 3); //avrundar ner till närmsta heltal
      totalUnits = this.units - totalDiscountUnits;
      str += item.price * totalUnits;
    } else {
      str += item.price * this.units;
    } // else

    str += `</p>
          </section>
        </section>`;

    return str;
  } // render
} // CartItem
