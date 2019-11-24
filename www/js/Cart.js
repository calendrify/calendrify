class Cart {
  constructor(cartManager, products) {
    // Save a reference to the product list and cart manager
    this.products = products;
    this.cartManager = cartManager;
  } // constructor

  render() {
    // Render all items in the cart to a web page
    $("main").html(`
      <section class="row">
        <div class="col">
          <h1>Kundvagn</h1>
        </div>
      </section>
      <section class="row">
        <!-- Notice the "loop" using the array map method -->
        ${this.cartManager.items
          .map(item => item.render(this.products))
          .join("")}
      </section>
    `);
  } // render

  renderInDropDown() {
    if (this.cartManager.items.length === 0) {
      $("#cart-menu").html("<div>Kundvagnen är tom!</div>");
    } else {
      $("#cart-menu").html(
        this.cartManager.items
          .map(item => item.renderInDropDown(this.products))
          .join("") +
          '<li><a class="text-center" href="#cart">Gå till kundvagn</a></li>'
      );
    } // else
  } // renderInDropDown

  updateArticleCount() {
    $("#articles-in-cart").text(" " + this.cartManager.getNumberOfItems());
  } // updateArticleCount
} // Cart
