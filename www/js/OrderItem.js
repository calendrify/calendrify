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
      <section class="col-md-4 col-12">
        <span class="d-sm-inline d-md-none font-weight-bold">Produkt: </span>${
          this.name
        }
      </section>
      <section class="col-md-2 text-left text-md-right col-12">
        <span class="d-sm-inline d-md-none font-weight-bold">Antal: </span>${
          this.units
        }
      </section>
      <section class="col-md-2 text-left text-md-right col-12">
      <span class="d-sm-inline d-md-none font-weight-bold">á pris: </span>
          ${this.sweNumFormatter.format(this.price)} kr
      </section>
      <section class="col-md-2 text-left text-md-right col-12">
      <span class="d-sm-inline d-md-none font-weight-bold">Delsumma: </span>
        ${this.sweNumFormatter.format(this.total.totalPrice)} kr
      </section>
      <section class="col-md-2 col-12">
      <span class="d-sm-inline d-md-none font-weight-bold">Rabatt: </span>
        ${
          this.discount
            ? `Du sparade: ${this.sweNumFormatter.format(
                this.price * this.units - this.total.totalPrice
              )} kr`
            : "Ingen rabatt"
        }
      </section>
      </section>
      <hr class="d-sm-block d-md-none my-1"/>`;
  } // render
} // class OrderIten
