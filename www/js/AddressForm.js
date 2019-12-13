class AddressForm {
  /*
      I am an Adressform page.
      I display info about you.
    */
  constructor(cartManager, orderManager, products) {
    this.cartManager = cartManager;
    this.orderManager = orderManager;
    this.products = products;

    $("body").on("submit", "#order-form", e => {
      e.preventDefault(); // inte ladda om sidan..
      let data = {};

      data["firstName"] = $("#inputFirstName").val();
      data["lastName"] = $("#inputLastName").val();
      data["adress"] = $("#inputAddress").val();
      data["adress2"] = $("#inputAddress2").val();
      data["zip"] = $("#inputZip").val();
      data["city"] = $("#inputCity").val();
      data["email"] = $("#inputEmail4").val();
      data["gridcheck"] = $("#gridCheck:checked").val() ? true : false;

      address.addressInfo = JSON.stringify(data);
      address.save();

      lastOrderId.lastOrderId = JSON.stringify(new Date().getTime());
      lastOrderId.save();

      orderManager.addOrder(
        this.products,
        this.cartManager.getCurrentCartItems(),
        data,
        this.cartManager.getTotalWeight() * 40
      );

      // Should the cart be deleted (emptied in the case of the default (first) cart)
      if ($("#do-remove-cart:checked").val()) {
        this.cartManager.clearCurrentCart();
        this.cartManager.updateArticleCount();
        this.cartManager.renderInDropDown();
      } // delete cart after ordering

      window.location = "#confirmation";
    });
  } // constructor

  render() {
    let emptyString = this.cartManager.currentCart == 0 ? "Töm" : "Radera";

    $("main").html(/*html*/ `
      <section class="row">
        <div class="col text-center">
          <h1 class="text-primary">Adressinformation</h1>
        </div>
      </section>

      <form id="order-form">
        <div class="form-row">
          <div class="form-group col-12 col-md-3 offset-md-3">
            <label for="inputFirstName">Förnamn</label>
            <input type="text" id="inputFirstName" class="form-control" placeholder="Förnamn" required>
          </div>
          <div class="col-12 col-md-3">
            <label for="inputLastName">Efternamn</label>
            <input type="text" id="inputLastName" class="form-control" placeholder="Efternamn" required>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group col-12 col-md-6 offset-md-3">
            <label for="inputAddress">Adress</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="Storgatan 1234" required>
          </div>
          <div class="form-group col-12 col-md-6 offset-md-3">
            <label for="inputAddress2">Adress 2</label>
            <input type="text" class="form-control" id="inputAddress2" placeholder="Adressrad 2">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group col-4 col-md-2 offset-md-3">
            <label for="inputZip">Postnummer</label>
            <input type="text" class="form-control" id="inputZip"  placeholder="123 12" required>
          </div>
          <div class="form-group col-8 col-md-4">
            <label for="inputCity">Postort</label>
            <input type="text" class="form-control" id="inputCity"  placeholder="Malmö" required>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group col-12 col-md-6 offset-md-3">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="Email" required>
          </div>
        </div>
        
        <div class="row">
          <div class="form-group col-12 col-md-6 offset-md-3 mb-1">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck">
              <label class="form-check-label" for="gridCheck">
                Jag godkänner att min e-mail kan användas i marknadsföringssyfte
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-12 col-md-6 offset-md-3 mb-1">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="do-remove-cart">
              <label class="form-check-label" for="do-remove-cart">
                ${emptyString} den här varukorgen ('<span class=font-italic>${this.cartManager.getCurrentCartName()}</span>') efter beställning
              </label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 d-flex offset-md-3 col-md-6 justify-content-between">
            <a class="btn btn-primary" href="#produkter">Fortsätt handla</a>
            <button type="submit" class="btn btn-primary">Bekräfta beställning</button>
          </div>
        </div>
      </form>
    </section>`);

    // Get the address information from local storage. Must be done here since there is no HTML in the constructor
    const info = address.addressInfo;

    if (info) {
      const data = JSON.parse(info);

      $("#inputFirstName").val(data["firstName"]);
      $("#inputLastName").val(data["lastName"]);
      $("#inputAddress").val(data["adress"]);
      $("#inputAddress2").val(data["adress2"]);
      $("#inputZip").val(data["zip"]);
      $("#inputCity").val(data["city"]);
      $("#inputEmail4").val(data["email"]);
      $("#gridCheck").prop("checked", data["gridcheck"]);
    } // if list....
  } // render
} // class AddressForm
