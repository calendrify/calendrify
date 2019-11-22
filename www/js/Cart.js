class Cart {
  /*

    I am a Cart.

    I want to be a shopping-cart
    but so far I am really stupid... 😢
  */

  constructor(cartManager) {
    // I also know who is my cart (the App sent me this info)
    this.cartManager = cartManager;
    // I add listeners to my buy-button(s)
    // this.addBuyButtonListener();
  }

  render() {
    // This is how I render myself on a product-detail page
    // there it only me
    $("main").html(`
      <section class="row">
        <div class="col">
          <h1>Kundvagn</h1>
        </div>
      </section>
      <section class="row">
        <!-- Notice the "loop" using the array map method -->
        ${this.cartManager.items.map(item => item.render()).join("")}
      </section>
    `);
  }

  renderInDropDown() {
    // let items = this.cartManager.getItems();
    // console.log("Lstan: ", typeof items, "Item: ", typeof items[0]);

    if (this.cartManager.items.length === 0) {
      $("#cart-menu").html("<div>Kundvagnen är tom!</div>");
    } else {
      $("#cart-menu").html(
        this.cartManager.items.map(item => item.renderInDropDown()).join("") +
          '<li><a class="text-center" href="#cart">Gå till kundvagn</a></li>'
      );
    }
  }

  updateArticleCount() {
    $("#articles-in-cart").text(" " + this.cartManager.getNumberOfItems());
  }

  add(product) {
    // We are doing a json stringify of the product
    // minus the cart property of a product
    // (which is just a reference to the cart)
    //
    // We don't need a JSON.stringify when we have
    // intelligent methods... This i purely to
    // show what product that is intended to be added...
    let getProdImgSrc = "#img-" + product.id;
    let cart = $(".fas.fa-shopping-cart");
    let animateImg = $(getProdImgSrc);
    console.log("animateImg", animateImg);
    if (animateImg) {
      let animateImgClone = animateImg
        .clone()
        .offset({
          top: animateImg.offset().top,
          left: animateImg.offset().left
        })
        .css({
          opacity: "0.5",
          position: "absolute",
          height: "150px",
          width: "150px",
          "z-index": "100"
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top + 10,
            left: cart.offset().left + 10,
            width: 50,
            height: 75
          },
          1000,
          "easeInOutExpo"
        );

      setTimeout(function() {
        cart.effect(
          "shake",
          {
            times: 2
          },
          200
        );
      }, 1500);

      animateImgClone.animate(
        {
          width: 0,
          height: 0
        },
        function() {
          $(this).detach();
        }
      );
    }
  }
}
