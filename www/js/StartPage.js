class StartPage {

  /*
    I am a Start page.
    I display the start page...
  */

  render() {
    $('main').html(/*html*/`
      <section class="row">
        <div class="col">
          <h1>Välkommen!</h1>
          <p>Välkommen till vår fina webbsida!</p>
        </div>
      </section>
    `);
  }

}