class CartItem {
  constructor(pId, units, setId, id) {
    // constructor(pId, name, desc, units, ppu, discounted, wpu, url) {
    this.productId = pId;
    this.units = units;
    // this.name = name;
    // this.description = desc;
    // this.pricePerUnit = ppu;
    // this.discouted = discounted;
    // this.weightPerUnit = wpu;
    // this.url = url;
    if (setId) {
      this.cartId = id;
    } else {
      this.cartId = CartItem.uniqueId++;
      store.uniqueId = CartItem.uniqueId;
    }
  } // constructor

  getProduct(products) {
    return products.find(item => item.id == this.productId);
  } // getProduct

  renderInDropDown(products) {
    const item = this.getProduct(products);

    return /*html*/ `
    <li>
      <span class="item" data-toggle="tooltip" title="${item.description}">
        <span class="item-left">
          <img
            src=${item.image}
            alt="" width="50em"
          />
          <span class="item-info">
            <span>${item.name}</span>
            <span>pris: ${item.price}</span>
          </span>
        </span>
        <span class="item-right">
          <button class="btn btn-danger fas fa-trash-alt pull-right"></button>
        </span>
      </span>
    </li>`;
  } // renderInDropDown

  render(products) {
    const item = this.getProduct(products);

    return /*html*/ `
        <section class="row align-items-center" id=${this.productId}>
          <section class="col-1">
            <i class="far fa-trash-alt btnDelete" id="delete-button-${
              this.productId
            }"></i>
          </section>
          <section class="col-8 col-md-7 align-items-center">
            <p>${item.description}</p>
          </section>
          <section class="col-3 offset-2 col-md-2 offset-md-0 align-items-center">
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

          <section class="col-1 align-items-center">
            <p>${item.price}</p>
          </section>
          <section class="col-4 col-md-1 text-right">
            <p class="font-weight-bold">
              ${item.price * this.units}
            </p>
          </section>
        </section>`;
  } // render
} // CartItem
