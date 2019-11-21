class AboutUs {
  /*
    I am an About Us page.
    I display info about us.
  */

  render() {
    $("main").html(/*html*/ `
      <section class="row">
        <div class="col">
          <h1>Om oss</h1>
          <p>Vi är litet företag som säljer ekologiska kalendrar.</p>
          <p>Vi hoppas ni köper mycket så att vi bir jätterika!!!!</p>
        </div>
      </section>
    `);
  }
}
