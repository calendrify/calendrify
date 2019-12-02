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

  addButtonListeners() {
    // Delete the item
    $("body").on("click", ".btnDelete", e => {
      let id = $(e.target)
        .closest(".cart-item")
        .attr("id");

      this.cartManager.removeItem(id);
      this.render();
      this.renderInDropDown();
      this.updateArticleCount();
    });

    // Decrease the number of units
    $("body").on("click", ".btnMinus", e => {
      let id = $(e.target)
        .closest(".cart-item")
        .attr("id");

      // Does the cart item have any items at all?
      let cartItem = this.cartManager.get(id);
      if (cartItem.units > 1) {
        cartItem.units--;
        this.cartManager.updateItem(id, cartItem);
        this.render();
        this.renderInDropDown();
        this.updateArticleCount();
      } // if cartItem...
    });

    // Add another unit to the item
    $("body").on("click", ".btnPlus", e => {
      let id = $(e.target)
        .closest(".cart-item")
        .attr("id");

      let cartItem = this.cartManager.get(id);
      cartItem.units++;
      this.cartManager.updateItem(id, cartItem);
      this.render();
      this.renderInDropDown();
      this.updateArticleCount();
    });

    $("body").on("click", ".trash-button", e => {
      e.preventDefault();
      let id = $(e.target)
        .closest(".cart-item")
        .attr("id");
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
    });
  } // addButtonListeners

  render() {
    $('[data-toggle="popover"]').popover("dispose");

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
        <section class="col-10 col-md-4 offset-md-1 col-lg-7 offset-lg-1 d-none d-md-block">
          <p class="mb-1">Produkt</p>
        </section>
        <section class="col-8 col-md-5 col-lg-3 text-right d-none d-md-block">
          <p class="mb-1">Pris</p>
        </section>
        <section class="col-1 col-md-2 col-lg-1 text-right d-none d-md-block">
          <p class="mb-1">Summa</p>
      </section>
      </section>
      <hr class="mt-0 mb-2 d-none d-md-block"/>
      ${this.cartManager.items.map(item => item.render(this.products)).join("")}
          `;
      str += "<hr class='mt-2 mb-0'/>";

      if (str.includes("discounted")) {
        str +=
          /*html*/
          `<section class="row small">
              <section class="col">
                <p class='mb-0'>* = Ingår i 3 för 2 erbjudandet</p>
              </section>
            </section>`;
      }
      str += /*html*/ `<section class="row">
                    <section class="col-9 col-md-10 col-lg-11 text-right">
                      <p class='mb-1'>Summa</p>
                    </section>
                    <section class="col-3 col-md-2 col-lg-1 text-right">
                      <p class='mb-1'>${this.sweNumFormatter.format(
                        this.cartManager.getTotalPrice(this.products).totalPrice
                      )}</p>
                    </section>
                  </section>`;

      str += `<section class="row">
         <section class="col-9 col-md-10 col-lg-11 text-right">
           <p class='mb-1'>Frakt</p>
         </section>
         <section class="col-3 col-md-2 col-lg-1 text-right">
           <p class='mb-1'>${this.sweNumFormatter.format(
             this.cartManager.getTotalWeight(this.products) * 40
           )}</p>
         </section>
       </section>`;

      str += `<section class="row font-weight-bold">
            <section class="col-9 col-md-10 col-lg-11 text-right">
              <p class='mb-1'>Totalsumma</p>
            </section>
            <section class="col-3 col-md-2 col-lg-1 text-right">
              <p class='mb-1'>${this.sweNumFormatter.format(
                this.cartManager.getTotalWeight(this.products) * 40 +
                  this.cartManager.getTotalPrice(this.products).totalPrice
              )}</p>
            </section>
          </section>`;

      str += /*html*/ `<section class="row small">
          <section class="col-9 col-md-10 col-lg-11 text-right">
            <p class='mb-1'>Varav moms</p>
          </section>
          <section class="col-3 col-md-2 col-lg-1 text-right">
            <p class='mb-1'>${this.sweNumFormatter.format(
              (this.cartManager.getTotalWeight(this.products) * 40 +
                this.cartManager.getTotalPrice(this.products).totalPrice) *
                0.25
            )}</p>
          </section>
          </section>`;

      if (str.includes("discounted")) {
        str += /*html*/ `<section class="row small">
            <section class="col-11 text-right">
              <p class='mb-0'>Du sparar</p>
            </section>
            <section class="col-1 text-right">
              <p class='mb-0'>${this.sweNumFormatter.format(
                this.cartManager.getTotalPrice(this.products).totalSaved
              )}</p>
            </section>
          </section>`;
      }

      str += /*html*/ `<section class="row">
            <section class="col-11 text-right">
              <a class="btn btn-primary" href="#produkter">Fortsätt handla</a>
            </section>
            <section class="col-1 text-right mx-0">
              <a href="#addressform"><button class="btn btn-primary" id="order-button">Beställ</button></a>
            </section>
          </section>`;
    }
    $("main").html(str);

    $('[data-toggle="popover"]').popover();
    $('[data-toggle="popover"]').popover("show");

    $("body").on("click", function(e) {
      $('[data-toggle="popover"]').each(function() {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("dispose");
          // $('[data-toggle="popover"]').popover();
          // $('[data-toggle="popover"]').popover("show");
        }
      });
    });
    // $(".popover-dismiss").popover({ trigger: "focus" });
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
            this.cartManager.getTotalPrice(this.products)
          )} kr</span>` +
          ' <hr class="item-separator" /><li><a class="text-center" href="#cart"><button class="btn btn-primary w-100">Gå till varukorg</button></a></li>'
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
