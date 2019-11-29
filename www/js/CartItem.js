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
        <section class="row cart-item" id=${this.id}>
          <section class="col-1">
            <i class="far fa-trash-alt btnDelete" id="delete-button-${this.id}"></i>
          </section>
          <section class="col-8 col-md-7">
            <p data-toggle="tooltip" title="${item.description}" data-placement="left">${item.name}</p>
          </section>
          <section class="col-3 offset-2 col-md-2 offset-md-0">
            <span>
              <i class="fas fa-minus btnMinus"></i>
            </span>
            <span class="font-weight-bold">
              ${this.units}
            </span>
            <span>
              <i class="fas fa-plus btnPlus"></i>
            </span>
          </section>
          <section class="col-1 text-right container-prod-img">
            <p>${item.price}`;

    // Is the item discounted (3-for-2): display an asterisk after the price
    if (item.discount) {
      str += "<span class='discounted'>*</span>";
    } // if item...

    str += `</p>
          </section>
          <section class="col-4 col-md-1 text-right">
            <p class="font-weight-bold">`;

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
