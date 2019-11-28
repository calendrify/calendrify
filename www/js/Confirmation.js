class Confirmation {
  /*
    I am an About Us page.
    I display info about us.
  */

  render() {
    let email;
    const info = address.addressInfo;

    if (info) {
      const data = JSON.parse(info);
      email = data["email"];
    } // if list....
    else data["email"] = "---";

    $("main").html(/*html*/ `
      <section class="row">
        <div class="col d-flex justify-content-center">
        <div class="message-container"> 
        <i class="fas fa-check-circle"id="confirm" ></i>
        <h1>Tack för din beställning!</h1>
        <p>En bekräftelse har skickats till: ${email} </p>
        </div>
        </div>
      </section>
    `);
  } // render
} // class Confirmation
