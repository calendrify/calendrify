class CartItem {
  constructor(pId, name, desc, units, ppu, discounted, wpu, url) {
    this.productId = pId;
    this.name = name;
    this.description = desc;
    this.units = units;
    this.pricePerUnit = ppu;
    this.discouted = discounted;
    this.weightPerUnit = wpu;
    this.url = url;
    this.cartId = CartItem.uniqueId++;
    store.uniqueId = CartItem.uniqueId;
  }

  renderInDropDown() {
    return /*html*/ `
    <li>
      <span class="item">
        <span class="item-left">
          <img
            src=${this.url}
            alt="" width="50em"
          />
          <span class="item-info">
            <span>${this.name}</span>
            <span>pris: ${this.pricePerUnit}</span>
          </span>
        </span>
        <span class="item-right">
          <button class="btn btn-danger fas fa-trash-alt pull-right"></button>
        </span>
      </span>
    </li>`;
  }

  render() {
    return /*html*/ `
        <section class="row align-items-center" id=${this.uniqueId}>
          <section class="col-1">
            <i class="far fa-trash-alt btnDelete"></i>
          </section>
          <section class="col-8 col-md-7 align-items-center">
            <p id="template-description">${this.description}</p>
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
            <p>${this.pricePerUnit}</p>
          </section>
          <section class="col-4 col-md-1 text-right">
            <p class="font-weight-bold" id="template-totPrice">
              ${this.pricePerUnit * this.units}
            </p>
          </section>
        </section>;`;
  }
}
