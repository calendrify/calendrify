class OrderManager {
  constructor() {
    this.orderList = [];
    this.load();
    this.sortAscending = false;
    this.addButtonListener();
  } // constructor

  addButtonListener() {
    $("body").on("click", ".btn-sort", e => {
      this.sortAscending = !this.sortAscending;
      $(e.target).toggleClass("fa-sort-amount-up-alt");
      $(e.target).toggleClass("fa-sort-amount-down-alt");
      this.render();
    });
  } // addButtonListener

  /**
   * Loads the order items from local storage.
   */
  load() {
    const list = order.orders;
    this.orderList =
      list == undefined
        ? []
        : JSON.parse(list).map(
            item =>
              new Order(
                item.address,
                item.orderId,
                item.items,
                item.shippingCost
              )
          );
  } // load

  save() {
    order.orders = JSON.stringify(this.orderList);
    order.save();
  } // save

  addOrder(products, cartItems, addressinfo, shippingCost) {
    let orderItems = [];
    for (let item of cartItems) {
      //let items = cartItems.map(item => {
      let product = products.find(i => i.id == item.id);
      orderItems.push(
        new OrderItem(
          product.name,
          item.units,
          product.price,
          item.getRowTotal(products),
          product.discount
        )
      );
    } // for let...

    let newOrder = new Order(
      addressinfo,
      JSON.parse(lastOrderId.lastOrderId),
      orderItems,
      shippingCost
    );
    this.orderList.push(newOrder);
    this.save();
  } // addOrder

  render() {
    let str = /*html*/ `
    <section class="row justify-space-between align-items-center">
     <section class="col">
      <h1 class="text-primary ml-3">Orderhistorik</h1>
         </section>
        <section class="col text-right">
        <h3 class="d-inline">${
          this.sortAscending ? "Äldst" : "Senast"
        } först</h3> 
        <h2 class="d-inline"><i class="fas ${
          this.sortAscending
            ? "fa-sort-amount-down-alt"
            : "fa-sort-amount-up-alt"
        } text-primary btn-sort"></i>
        </h2>
        </section>
      </section>`;

    if (this.orderList.length === 0) {
      str += /*html*/ `<section class="row">
                <section class="col text-center text-primary">
                  <h2>Orderhistorik saknas!</h2>
                </section>
              </section>`;
    } else {
      str += /*html*/ ` ${
        this.sortAscending
          ? this.orderList.map(item => item.render()).join("")
          : this.orderList
              .slice()
              .reverse()
              .map(item => item.render())
              .join("")
      }
        <div class="accordion" id="accordion">
        </div>`;
    } // else

    $("main").html(str);
  } // render
} // class OrderManager
