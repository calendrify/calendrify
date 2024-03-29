class Order {
  constructor(address, orderId, items, shippingCost) {
    this.items = [];
    this.address = address;
    this.shippingCost = shippingCost;
    this.orderId = orderId; // Same as milliseconds since 1970, i.e. the time when the order was created
    for (let item of items) {
      let orderItem = new OrderItem(
        item.name,
        item.units,
        item.price,
        item.total, //OBS! Två värden: totalPrice och totalSaved
        item.discount
      );
      this.items.push(orderItem);
    } //for  item...
  } // constructor

  render() {
    let totalPrice = 0;
    let totalArticles = 0;

    // Calculate the number of articles and the total price for all items
    for (let item of this.items) {
      totalArticles += item.units;
      totalPrice += item.total.totalPrice;
    } // for item...

    // Add the shipping cost to the total
    totalPrice += this.shippingCost;

    return /*html*/ `
          <section class="row">
            <section class="col">
              <div class="card">
                <div class="card-header" id='heading${this.orderId}'>
                  <h2 class="mb-0">
                  <button class="btn btn-link w-100" type="button" data-toggle="collapse" data-target="#collapse${
                    this.orderId
                  }" aria-expanded="true" aria-controls="collapse${
      this.orderId
    }">
                    <section class="row justify-space-between">
                      <section class="col text-left">
                        <p class="my-0">Datum: ${new Date(
                          this.orderId
                        ).toLocaleString()}</p>
                      </section>
                      <section class="col text-right">
                        <p class="my-0">Ordernummer: ${this.orderId}</p> 
                      </section>
                    </section>
            <section class="row justify-space-between">
              <section class="col text-left">
              <span>Antal artiklar: ${totalArticles}</span>
              </section>
              <section class="col text-right">
                <span>Totalsumma inkl. frakt: ${new Intl.NumberFormat("sv-SE", {
                  maximumFractionDigits: 0
                }).format(totalPrice)} kr</span>
              </section>
            </section>
            </button>
          </h2>
        </div>

        <div id="collapse${
          this.orderId
        }" class="collapse show" aria-labelledby="heading${
      this.orderId
    }" data-parent="#accordion">
          <div class="card-body">
            <div class="row">
              <h2 class="text-primary ml-3">Adressinformation</h2>
            </div>
            <section class="row">
              <section class="col-12">
                ${this.address["firstName"]} ${this.address["lastName"]}
              </section>
              <section class="col-12">
                ${this.address["adress"]} 
              </section>
               <section class="col-12">
                ${this.address["adress2"]} 
              </section>
               <section class="col-12">
                ${this.address["zip"]} ${this.address["city"]} 
              </section>
               <section class="col-12">
                ${this.address["email"]} 
              </section>
            </section>
            <section class="row font-weight-bold mt-2">
              <section class="col-md-4 d-none d-md-block">
                <p class="my-0">Produkt</p>
              </section>
                <section class="col-md-2 d-none d-md-block">
                <p class="my-0 text-right">Antal</p>
              </section>
                <section class="col-md-2 d-none d-md-block">
                <p class="my-0 text-right">á pris</p>
              </section>
                <section class="col-md-2 d-none d-md-block">
                <p class="my-0 text-right">Delsumma</p>
              </section>
                <section class="col-md-2 d-none d-md-block">
                <p class="my-0">Rabatt</p>
              </section>
            </section>
            ${this.items.map(item => item.render()).join("")}
          </div>
        </div>
        </section> 
      </section>`;
  } //render
} // class Order
