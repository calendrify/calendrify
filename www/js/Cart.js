class Cart {
  constructor(cartManager, products) {
    // Save a reference to the product list and cart manager
    this.products = products;
    this.cartManager = cartManager;

    this.addButtonListeners();
  } // constructor

  addButtonListeners() {
    $("body").on("click", ".btnDelete", e => {
      let id = $(e.target)
        .parent()
        .parent()
        .attr("id");

      this.cartManager.removeItem(id);
      this.render();
      this.renderInDropDown();
      this.updateArticleCount();
    });
  }
  render() {
    // Render all items in the cart to a web page
    $("main").html(/*html*/ `
      <section class="row">
        <div class="col">
          <h1 class="text-primary">Varukorg</h1>
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
