class StartPage {
  /*
    I am a Start page.
    I display the start page...

    Sound effect: "Door Squeak, Normal, E.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
  */

  constructor() {
    $("body").on("click", ".door", e => {
      $("audio#creaky-door")[0].play();
      $(e.target).toggleClass("doorOpen");
    });
  } // constructor

  render() {
    $("main").html(/*html*/ `
      <audio id="creaky-door">
        <source src="/audio/346211__inspectorj__door-squeak-normal-e.mp3" type="audio/mpeg">
      </audio>
      <div class="fullscreen-bg">
        <video loop muted autoplay class="fullscreen-bg__video">
          <source src="/images/background-video.webm" type="video/webm">
        </video>
      </div>
      <section class="row">
        <div class="col">
          <h1 class="text-secondary text-center">Välkommen till Calendrify!</h1>
        </div>
      </section>
      <section class='door1'>
        <div class='backDoor rounded'>
          <a href='#produkter' data-toggle="tooltip" title="Just nu har vi en oslagbar rabatt på utvalda varor!">
            <p class='text-center pt-1'>Köp 3, betala för 2 på utvalda varor!</p>
          </a>
          <div class='door red-door d-flex align-items-center justify-content-center rounded' data-toggle="tooltip" title="Klicka på mig för att öppna eller stänga!">
              <p>Kampanjerbjudande!</p>
          </div>
        </div>
      </section>
      <section class='door2'>
        <div class='backDoor rounded-circle'>
          <a href='#produkter-whiskey' data-toggle="tooltip" title="Njut av en ny whiskey varje dag fram till jul">
            <p class='text-center pt-4 clippy'>Till whiskeyälskaren</p>
          </a>
          <div class='door green-door d-flex align-items-center justify-content-center rounded-circle' data-toggle="tooltip" title="Klicka på mig för att öppna eller stänga!">
            <p class="pt-3">Present till far?</p>
          </div>
        </div>
      </section>
      <section class='door3'>
        <div class='backDoor rounded-circle'>
          <a href='#produkter-badbomb' data-toggle="tooltip" title="Må gott och slappa i badet med ett lugnande skumbad varje kväll">
            <p class='text-center pt-3 clippy2'>Grattis kära mor!</p>
          </a>
          <div class='door pink-door d-flex align-items-center justify-content-center rounded-circle' data-toggle="tooltip" title="Klicka på mig för att öppna eller stänga!">
            <p class="pt-3">Något till mor!</p>
          </div>
        </div>
      </section>
    `);
  } // render
} // class StartPage
