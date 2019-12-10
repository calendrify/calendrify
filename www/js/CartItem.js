/**
 * The class represents an item in the cart.
 * The only values it contains is the product id and the number of units for that item.
 * The actual product information is retrieved through the product id from the products list sent as parameter to the different render methods.
 */

class CartItem {
  constructor(id, units) {
    this.id = id;
    this.units = units;

    // Create a number formatter
    this.sweNumFormatter = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0
    });
  } // constructor

  getRowTotal(products) {
    let totalPrice = 0;
    let totalSaved = 0;
    let pItem = products.find(i => i.id == this.id);
    if (pItem.discount) {
      let totalUnits = 0;
      let totalDiscountUnits = Math.floor(this.units / 3); //avrundar ner till närmsta heltal

      totalUnits = this.units - totalDiscountUnits;
      totalPrice += pItem.price * totalUnits;
      totalSaved += pItem.price * totalDiscountUnits;
    } else {
      totalPrice += pItem.price * this.units;
    }
    return { totalPrice: totalPrice, totalSaved: totalSaved };
  } // getRowTotal

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
      <a href="#${item.slug}">
      <span class="item" data-toggle="tooltip" title="${
        item.description
      }" data-placement="left">
        <span class="item-left">
          <img
            src=${item.image}
            alt="" width="50em"
          />
          <span class="item-info small">
            <span class="font-weight-bold">${item.name}</span>
            <span>Antal: ${this.sweNumFormatter.format(this.units)}</span>
            <span>Pris/st: ${this.sweNumFormatter.format(item.price)} kr</span>
          </span>
        </span>
        <span class="item-right">
          <button class="btn btn-primary fas fa-trash-alt pull-right trash-button"></button>
        </span>
      </span>
      <hr class="item-separator"/>
      </a>
    </li>`;
  } // renderInDropDown

  updateUnitsAndSum(products) {
    let str;
    const item = this.getProduct(products);

    $("#units" + this.id).text(this.sweNumFormatter.format(this.units));

    // If the item is discounted and there is one item left to get the 3-for-2 discount,
    // add the popover attributes, otherwise remove them
    if (item.discount && this.units % 3 === 2) {
      $("#btn-plus" + this.id).attr("data-trigger", "focus");
      $("#btn-plus" + this.id).attr("data-toggle", "popover");
      $("#btn-plus" + this.id).attr("data-placement", "right");
      // $("#btn-plus" + this.id).attr("title", "3-för-2 rabatt");
      $("#btn-plus" + this.id).attr(
        "data-content",
        "Om du lägger till en kalender till så blir den gratis!"
      );

      $('[data-toggle="popover"]').popover();
      $('[data-toggle="popover"]').popover("show");
    } else {
      $("#btn-plus" + this.id).removeAttr("data-toggle");
      $("#btn-plus" + this.id).removeAttr("data-trigger");
      $("#btn-plus" + this.id).removeAttr("data-content");
      $("#btn-plus" + this.id).removeAttr("data-placement");
    } //  else

    // Add the total item price information
    // Is the item discounted (3-for-2): calculate the discount
    if (item.discount) {
      let totalDiscountUnits = Math.floor(this.units / 3); //avrundar ner till närmsta heltal
      let totalUnits = this.units - totalDiscountUnits;
      str = this.sweNumFormatter.format(item.price * totalUnits);
    } else {
      str = this.sweNumFormatter.format(item.price * this.units);
    } // else

    $("#totsum" + this.id).text(str + " kr");
  } // updateUnitsAndSum

  /**
   * Renders the cart item in the cart drop down list located in the menu
   * @param {*} products an array of all the products, so we can look up the product info
   * @returns {string} HTML-formatted string.
   */
  render(products) {
    const item = this.getProduct(products);

    let str = /*html*/ `
        <section class="row cart-item my-1 orderRow" id=${this.id}>
          <section class="col-1 my-1 mb-md-1 offset-1 text-right offset-md-1 align-self-center">
            <button class="btn btn-primary btnDelete"><i class="far fa-trash-alt" id="delete-button-${
              this.id
            }"></i></button>
          </section>
          <section class="col-8 font-weight-bold font-weight-md-bold text-center text-lg-left col-lg-3 align-self-center">
            <p class="m-0" data-toggle="tooltip" title="${
              item.description
            }" data-placement="bottom"><a href="#${item.slug}">${
      item.name
    }</a></p>
          </section>
          <section class="col-12 col-lg-1 px-lg-0 offset-lg-1 my-2 my-md-2 text-center d-flex justify-content-center justify-content-lg-between align-items-center">
            <span>
              <button class="btn btn-primary btnMinus"><i class="fas fa-minus"></i></button>
            </span>
            <span class="font-weight-bold px-1" id='units${this.id}'>
              ${this.sweNumFormatter.format(this.units)}
            </span>
            <span>`;

    // If the item is discounted and there is one item left to get the discount,
    // create a popupable element (a-tag)
    if (item.discount && this.units % 3 === 2) {
      str += /*html*/ `<a class="btn btn-primary btnPlus text-white" 
                  id='btn-plus${this.id}'
                  role="button" 
                  tabindex="0"
                  data-trigger="focus"
                  data-toggle="popover"
                  data-placement="right"
                  data-content="Om du lägger till en kalender till så blir den gratis!"
                  title="3-för-2 rabatt">  
                <i class="fas fa-plus"></i>
              </a>`;
    } else {
      str += /*html*/ `<a class="btn btn-primary btnPlus text-white" 
                  id='btn-plus${this.id}'
                  title="3-för-2 rabatt"
                  role="button">  
                <i class="fas fa-plus"></i>
              </a>`;
    } //  else

    str += /*html*/ `</span>
          </section>
          <section class="col-4 mx-auto mx-lg-0 col-lg-2 text-center text-lg-right align-self-center">
            <span class="d-sm-inline d-lg-none">á pris: </span>
            <span class="m-0 discountParent">${this.sweNumFormatter.format(
              item.price
            )} kr</span>`;

    // Is the item discounted (3-for-2): display an asterisk after the price
    if (item.discount) {
      str += /*html*/ `<span class='discounted'>*</span>`;
    } // if item...

    str += /*html*/ `
          </section>
          <section class="col-12 col-lg-2 text-center text-lg-right align-self-center">
           <span class="d-sm-inline d-lg-none">Summa: </span>
            <span class="font-weight-bold m-0" id='totsum${this.id}'>`;

    // Add the total item price information
    // Is the item discounted (3-for-2): calculate the discount
    if (item.discount) {
      let totalDiscountUnits = Math.floor(this.units / 3); //avrundar ner till närmsta heltal
      let totalUnits = this.units - totalDiscountUnits;
      str += this.sweNumFormatter.format(item.price * totalUnits);
    } else {
      str += this.sweNumFormatter.format(item.price * this.units);
    } // else

    str += /*html*/ ` kr</span>
          </section>
        </section>
        <hr class="item-separator d-md-none"/>`;

    return str;
  } // render
} // CartItem
