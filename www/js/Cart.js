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
        .closest(".cart-item")
        .attr("id");

      this.cartManager.removeItem(id);
      this.render();
      this.renderInDropDown();
      this.updateArticleCount();
    });
    $("body").on("click", ".btnMinus", e => {
      let id = $(e.target)
        .closest(".cart-item")
        .attr("id");

      let cartItem = this.cartManager.get(id);
      if(cartItem.units > 0){
        cartItem.units--;
        this.cartManager.updateItem(id, cartItem);
        this.render();
        this.renderInDropDown();
        this.updateArticleCount();
      }
    });

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
    });

  }

  render() {
    // Render all items in the cart to a web page
    let str=/*html*/ `
      <section class="row">
        <div class="col">
          <h1 class="text-primary">Varukorg</h1>
        </div>
      </section>`;

      if (this.cartManager.items.length === 0) {
       str+= "<div>Kundvagnen är tom!</div>";}
       else {
        // Notice the "loop" using the array map method 
        str += `${this.cartManager.items
          .map(item => item.render(this.products))
          .join("")}
          `;
          str+= "<hr/>";
          
          if (str.includes('discounted')){
            str += `<section class="row small">
            <section class="col-12">
              <p>* = Ingår i 3 för 2 erbjudandet</p>
            </section>
            </section>`;

          }
          str+= `<section class="row">
                    <section class="col-11 text-right">
                      <p>Summa</p>
                    </section>
                    <section class="col-1 text-right">
                      ${this.cartManager.getTotalPrice(this.products)}
                    </section>
                  </section>
         `;

         str+= `<section class="row">
         <section class="col-11 text-right">
           <p>Frakt</p>
         </section>
         <section class="col-1 text-right">
           ${this.cartManager.getTotalWeight(this.products) *40}
         </section>
       </section>
`;

          str+= `<section class="row font-weight-bold">
          <section class="col-11 text-right">
            <p>Totalsumma</p>
          </section>
          <section class="col-1 text-right">
            ${this.cartManager.getTotalWeight(this.products) *40 + this.cartManager.getTotalPrice(this.products) }
          </section>
          </section>
          `;

          str+= `<section class="row small">
          <section class="col-11 text-right">
            <p>Varav moms</p>
          </section>
          <section class="col-1 text-right">
            ${(this.cartManager.getTotalWeight(this.products) *40 + this.cartManager.getTotalPrice(this.products)) *0.25 }
          </section>
          </section>
          <section class="row">
            <section class="col-12 text-right">
              <a href="#addressform"><button id="order-button">Beställ</button></a>
            </section>
          </section>
          `;
        
        }
        $("main").html(str);
        } // render

  renderInDropDown() {
    if (this.cartManager.items.length === 0) {
      $("#cart-menu").html("<div>Kundvagnen är tom!</div>");
    } else {
      $("#cart-menu").html(
        this.cartManager.items
          .map(item => item.renderInDropDown(this.products))
          .join("") +
          ' <hr/><li><a class="text-center" href="#cart">Gå till kundvagn</a></li>'
      );
    } // else
  } // renderInDropDown

  updateArticleCount() {
    $("#articles-in-cart").text(" " + this.cartManager.getNumberOfItems());
  } // updateArticleCount
} // Cart
