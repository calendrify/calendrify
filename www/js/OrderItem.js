class OrderItem {
  constructor(name, units, price, total, discount) {
    this.name = name;
    this.units = units;
    this.price = price;
    this.total = total;
    this.discount = discount;

    // Create a number formatter
    this.sweNumFormatter = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0
    });
  } // constructor

  render() {
    return /*html*/ `
    <section class="row">
      <section class="col">
        ${this.name}
      </section>
      <section class="col text-right">
        ${this.units}
      </section>
      <section class="col text-right">
          ${this.sweNumFormatter.format(this.price)} kr
      </section>
      <section class="col text-right">
        ${this.sweNumFormatter.format(this.total.totalPrice)} kr
      </section>
      <section class="col">
        ${
          this.discount
            ? `Du sparade: ${this.sweNumFormatter.format(
                this.price * this.units - this.total.totalPrice
              )} kr`
            : "Ingen rabatt"
        }
      </section>
    </section>
    `;
  }
} // class OrderIten
