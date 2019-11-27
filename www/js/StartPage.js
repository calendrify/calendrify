class StartPage {
  /*
    I am a Start page.
    I display the start page...

    Sound effect: "Door Squeak, Normal, E.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
  */

  constructor() {
    $("body").on("click", ".door", e => {
      $("audio#creaky-door")[0].play();
      $(e.target).toggleClass("doorOpenRight");
    });
  } // constructor

  render() {
    $("main").html(/*html*/ `
      <audio id="creaky-door">
        <source src="/audio/346211__inspectorj__door-squeak-normal-e.mp3" type="audio/mpeg">
      </audio>
      <section class="row">
        <div class="col">
          <h1 class="text-primary">Välkommen!</h1>
        </div>
      </section>
      <section class='row'>
        <section class='col-12 col-md-6'>
          <div class='backDoor1 rounded'>
            <a href='#produkter'><p class='text-center pt-3'>Köp tre, betala för 2 på utvalda varor!</p>
            </a>
            <div class='door d-flex align-items-center justify-content-center rounded'>
            <p class='text-light'>Kampanjerbjudande!</p>
            </div>
            </div>
            </section>
          <section class='col-12 col-md-6'>
            <div class='backDoor2 rounded-circle'>
              <a href='#produkter-whiskey'>
                <p class='text-center pt-4'>För whiskeyälskaren!</p>
              </a>
              <div class='door d-flex align-items-center justify-content-center rounded-circle'>
                <p class='text-light'>Klicka på mig med!</p>
              </div>
            </div>
          </section>
        </section>
    `);
  }
}
