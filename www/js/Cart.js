class Cart {
  constructor(cartManager, products) {
    // Save a reference to the product list and cart manager
    this.products = products;
    this.cartManager = cartManager;

    this.addButtonListeners();

    // Create a number formatter
    this.sweNumFormatter = new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0
    });
  } // constructor

  getCartItemId(target) {
    return target.closest(".cart-item").attr("id");
  } // getCartItemId

  addButtonListeners() {
    $("body").on("click", e => {
      let id = this.getCartItemId($(e.target));
      let cartItem = this.cartManager.get(id);

      if (
        e.target.className.includes("btnPlus") ||
        $(e.target)
          .parent()
          .hasClass("btnPlus")
      ) {
        $('[data-toggle="popover"]').popover("dispose");

        cartItem.units++;
        this.cartManager.updateItem(id, cartItem);

        cartItem.updateUnitsAndSum(this.products);
        this.updateTotals();

        this.renderInDropDown();
        this.updateArticleCount();

        return;
      } // btnPlus

      if (
        e.target.className.includes("btnMinus") ||
        $(e.target)
          .parent()
          .hasClass("btnMinus")
      ) {
        $('[data-toggle="popover"]').popover("dispose");

        // Does the cart item have any items at more than one unit?
        if (cartItem.units > 1) {
          cartItem.units--;
          this.cartManager.updateItem(id, cartItem);

          cartItem.updateUnitsAndSum(this.products);
          this.updateTotals();

          this.renderInDropDown();
          this.updateArticleCount();
        } // if cartItem...

        return;
      } // btnMinus

      if (
        e.target.className.includes("btnDelete") ||
        $(e.target)
          .parent()
          .hasClass("btnDelete")
      ) {
        this.cartManager.removeItem(id);
        this.render();
        this.renderInDropDown();
        this.updateArticleCount();

        return;
      } // btnDelete

      if (
        e.target.className.includes("trash-button") ||
          $(e.target)
          .parent()
          .hasClass("trash-button")
      ) {
        e.preventDefault();

        this.cartManager.removeItem(id);

        this.renderInDropDown();
        this.updateArticleCount();

        // Are we on the cart page? If so, re-render it
        if (
          $(location)
            .attr("href")
            .includes("#cart")
        )
          this.render();

        return;
      } // trash-button

      $('[data-toggle="popover"]').each(function() {
        $(this).popover("dispose");
      });
    });
  } // addButtonListeners

  updateTotals() {
    $("#sum").text(
      this.sweNumFormatter.format(
        this.cartManager.getTotalPrice(this.products).totalPrice
      ) + " kr"
    );

    $("#shipping").text(
      this.sweNumFormatter.format(
        this.cartManager.getTotalWeight(this.products) * 40
      ) + " kr"
    );

    $("#grand-total").text(
      this.sweNumFormatter.format(
        this.cartManager.getTotalWeight(this.products) * 40 +
          this.cartManager.getTotalPrice(this.products).totalPrice
      ) + " kr"
    );

    $("#vat").text(
      this.sweNumFormatter.format(
        (this.cartManager.getTotalWeight(this.products) * 40 +
          this.cartManager.getTotalPrice(this.products).totalPrice) *
          0.25
      ) + " kr"
    );

    $("#saved").text(
      this.cartManager.getTotalPrice(this.products).totalSaved + " kr"
    );
  } // updateTotals

  render() {
    // Render all items in the cart to a web page
    let str = /*html*/ `
      <section class="row">
        <div class="col">
          <h1 class="text-primary">Varukorg</h1>
        </div>
      </section>`;

    if (this.cartManager.items.length === 0) {
      str += "<div>Kundvagnen är tom!</div>";
    } else {
      // Notice the "loop" using the array map method
      str += /*html */ `
      <section class="row font-weight-bold">
        <section class="text-primary col-lg-3 offset-md-2 d-none d-md-block">
          <p class="mb-1">Produkt</p>
        </section>
        <section class="text-primary col-8 col-lg-4 text-right d-none d-md-block">
          <p class="mb-1">Pris</p>
        </section>
        <section class="text-primary col-1 col-lg-2 text-right d-none d-md-block">
          <p class="mb-1">Summa</p>
      </section>
      </section>
      <hr class="mt-0 mb-2 d-none d-md-block"/>
      ${this.cartManager.items
        .map(item => item.render(this.products))
        .join("")}`;

      str += "<hr class='mt-2 mb-0 d-none d-md-block'/>";

      if (str.includes("discounted")) {
        str +=
          /*html*/
          `<section class="row small">
              <section class="col">
                <p class='mb-0'><span class="text-primary font-weight-bold">*</span> = Ingår i 3-för-2 erbjudandet</p>
              </section>
            </section>`;
      } // if discounted...

      str += /*html*/ `<section class="row">
                    <section class="col-6 col-lg-9 text-left text-lg-right">
                      <p class='mb-1'>Summa</p>
                    </section>
                    <section class="col-6 col-lg-2 text-right">
                      <p class='mb-1' id='sum'></p>
                    </section>
                  </section>`;

      str += /*html*/ `<section class="row">
         <section class="col-6 col-lg-9 text-left text-lg-right">
           <p class='mb-1'>Frakt</p>
         </section>
         <section class="col-6 col-lg-2 text-right">
           <p class='mb-1' id='shipping'></p>
         </section>
       </section>`;

      str += /*html*/ `<section class="row font-weight-bold">
            <section class="col-6 col-lg-9 text-left text-lg-right">
              <p class='mb-1'>Totalsumma</p>
            </section>
            <section class="col-6 col-lg-2 text-right">
              <p class='mb-1' id='grand-total'></p>
            </section>
          </section>`;

      str += /*html*/ `<section class="row small">
          <section class="col-6 col-lg-9 text-left text-lg-right">
            <p class='mb-1'>Varav moms</p>
          </section>
          <section class="col-6 col-lg-2 text-right">
            <p class='mb-1' id='vat'></p>
          </section>
          </section>`;

      if (str.includes("discounted")) {
        str += /*html*/ `<section class="row small">
            <section class="col-6 col-lg-9 text-left text-lg-right">
              <p class='mb-0'>Du sparar</p>
            </section>
            <section class="col-6 col-lg-2 text-right">
              <p class='mb-0' id='saved'></p>
            </section>
          </section>`;
      }

      str += /*html*/ `<section class="row mt-3">
            <section class=" col-6 col-lg-9 text-left text-lg-right">
              <a class="btn btn-primary" href="#produkter">Fortsätt handla</a>
            </section>
            <section class="col-6 col-lg-2 text-right mx-0">
              <a href="#addressform"><button class="btn btn-primary" id="order-button">Beställ</button></a>
            </section>
          </section>`;
    }
    $("main").html(str);

    this.updateTotals();
  } // render

  renderInDropDown() {
    if (this.cartManager.items.length === 0) {
      $("#cart-menu").html("<div class='text-center'>Kundvagnen är tom!</div>");
    } else {
      $('[data-toggle="tooltip"]').tooltip("dispose");
      $("#cart-menu").html(
        this.cartManager.items
          .map(item => item.renderInDropDown(this.products))
          .join("") +
          `<span class="cart-sum">Summa: </span><span class="cart-sum-right">${this.sweNumFormatter.format(
            this.cartManager.getTotalPrice(this.products).totalPrice
          )} kr</span>` +
          '<p class="small my-0 shipping">Priset inkl. moms, exkl. frakt</p>' +
          '<hr class="item-separator" /><li><a class="text-center" href="#cart"><button class="btn btn-primary w-100">Gå till varukorg</button></a></li>'
      );

      $('[data-toggle="tooltip"]').tooltip();
    } // else
  } // renderInDropDown

  /**
   * Updates the text containing the number of items in the cart
   * @returns {number} Number of total items in the cart.
   */
  updateArticleCount() {
    $("#articles-in-cart").text(
      " " + this.sweNumFormatter.format(this.cartManager.getNumberOfItems())
    );
  } // updateArticleCount
} // Cart
