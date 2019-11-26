class AddressForm {
    /*
      I am an Adressform page.
      I display info about you.
    */
  
    render() {
      $("main").html(/*html*/ `
        <section class="row">
          <div class="col">
            <h1 class="text-primary">Adressinformation</h1>
            <form>
                <div class="form-row">
                    <div class="form-group col">
                    <label for="inputFirstName">Förnamn</label>
                        <input type="text" id="inputFirstName" class="form-control" placeholder="Förnamn">
                    </div>
                    <div class="col">
                    <label for="inputLastName">Efternamn</label>
                        <input type="text" id="inputLastName" class="form-control" placeholder="Efternamn">
                    </div>
                </div>
        
            <div class="form-row">
                <div class="form-group col-6">
                    <label for="inputAddress">Adress</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Storgatan 1234">
                </div>
                <div class="form-group col-6">
                    <label for="inputAddress2">Adress 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Adressrad 2">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-2">
                <label for="inputZip">Postnummer</label>
                <input type="text" class="form-control" id="inputZip"  placeholder="123 12">
                </div>
                <div class="form-group col-md-4">
                <label for="inputCity">Postort</label>
                <input type="text" class="form-control" id="inputCity"  placeholder="Malmö">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                </div>
            </div>

            <div class="form-group">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck">
                <label class="form-check-label" for="gridCheck">
                    Jag godkänner att min e-mail kan användas i marknadsföringssyfte
                </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Bekräfta beställning</button>
            </form>
          </div>
        </section>
      `);
    }
  }
  