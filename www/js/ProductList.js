class ProductList {


  /*
    I am a ProductList.
    I know how to display my products.
  */


  constructor(products) {
    this.products = products;
  }

  render() {
    $('main').html(`
      <section class="row">
        <div class="col">
          <h1>Våra produkter</h1>
        </div>
      </section>
      <section class="row">
        <!-- Notice the "loop" using the array map method -->
        ${this.products.map(product => product.renderInList()).join('')}
      </section>
    `);
  }

}