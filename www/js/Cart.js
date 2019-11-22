class Cart {

  /*

    I am a Cart.

    I want to be a shopping-cart
    but so far I am really stupid... 😢
  */

  add(product) {
    // We are doing a json stringify of the product
    // minus the cart property of a product
    // (which is just a reference to the cart)
    //
    // We don't need a JSON.stringify when we have
    // intelligent methods... This i purely to
    // show what product that is intended to be added...
    let getProdImgSrc = "#img-"+product.id;
    let cart = $(".fas.fa-shopping-cart");
    let animateImg = $(getProdImgSrc);
    console.log('animateImg', animateImg);
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