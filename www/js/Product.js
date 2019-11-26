class Product {
  /*
    I am a Product.

    I know how to display myself on a single page (product detail).
    I also know how to display myself in a list of products.
    On top of that I know how to call the cart when someone
    clicks my buy-button.
  */

  constructor(data, cartManager) {
    // Object.assign is used to copy all properties from data to me
    Object.assign(this, data);

    this.cartManager = cartManager;
    // I add listeners to my buy-button(s)
    this.addBuyButtonListener();
  }

  addBuyButtonListener() {
    // this a delegated event handler:
    // * when you click on the body
    // * if you clicked inside something matching the css-selector
    //   #buy-button-myId
    // * then run the anonymous arrow function...
    $("body").on("click", `#buy-button-${this.id}`, e => {
      // e is the event object
      // it has a preventDefault method
      // when you call that method it prevents the browser
      // from doing what it normally does on a certain element
      // since the buy button is sometimes inside a a-tag
      // in this case it prevents us from following the a-tag
      e.preventDefault();
      // this.cart is an instance of Cart
      // add me to that cart

      this.cartManager.add(this, 1);
      this.cart.updateArticleCount();
      this.cart.renderInDropDown();
      this.animate();
      // this.cart.add(this, 1);
    });
  }

  /**
   * Set the associated cart
   */
  setCart(cart) {
    this.cart = cart;
  } // setCart

  render() {
    // This is how I render myself on a product-detail page
    // there it only me
    $("main").html(/*html*/ `
     <section class="row">
        <div class="col">
          <h1>${this.name}</h1>
        </div>
      </section>
      <section class="row">
        <div class="col-12 col-lg-9">
          <p>${this.description}</p>
          <h4>${this.price} kr</p>
          <button id="buy-button-${this.id}" class="btn btn-primary my-2">Köp</button>
          <img class="img-fluid" src="/images/3for2.png">
        </div>
        <div class="col-12 col-lg-3">
          <img class="img-fluid border border-primary rounded" id="img-${this.id}" src="${this.image}">
        </div>
      </section>
    `);
  } // render

  renderInList() {
    // This is how I render myself in a list of products
    // (this method is called from a ProductList)
    let str = /*html*/ `
      <div class="col-12 col-md-6 col-lg-4 mt-5">
        <a href="#${this.slug}" class="item" data-toggle="tooltip" title="${this.description}" >
          <h4>${this.name} ${this.price} kr</h4>
          <button id="buy-button-${this.id}" class="btn btn-primary my-2">Köp</button>
          <div class="container-prod-img">
            <img class="img-fluid border border-primary rounded prod-img" id="img-${this.id}" src="${this.image}">`;

    if (this.discount) {
      str += `<img class="img-fluid discount-img" src="/images/3for2.png" width=90em">`;
    }

    str += `</div></a></div>`;
    return str;
  } // renderInList

  animate() {
    let getProdImgSrc = "#img-" + this.id;
    let cart = $(".fas.fa-shopping-cart");
    let animateImg = $(getProdImgSrc);
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
          height: "100px",
          width: "150px",
          "z-index": "100"
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top + 10,
            left: cart.offset().left,
            width: 30,
            height: 20
          },
          1000,
          "easeInOutExpo"
        );
      setTimeout(function() {
        cart.effect(
          "shake",
          {
            times: 2,
            distance: 10
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
    } // if animateImg...
  } // animate
}
