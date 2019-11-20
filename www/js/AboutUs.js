class AboutUs {

  /*
    I am an About Us page.
    I display info about us.
  */

  render() {
    $('main').html(/*html*/`
      <section class="row">
        <div class="col">
          <h1>Om oss</h1>
          <p>Vi är litet företag som säljer ekologiska badprodukter.</p>
        </div>
      </section>
    `);
  }

}