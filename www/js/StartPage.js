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
      <section class='outer-door'>
        <section class='inner-door1'>
          <div class='backDoor rounded'>
            <a href='#produkter'><p class='text-center pt-1'>Köp tre, betala för 2 på utvalda varor!</p>
            </a>
            <div class='door red-door d-flex align-items-center justify-content-center rounded'>
                <p>Kampanjerbjudande!</p>
            </div>
          </div>
        </section>
      </section>
      <section class='outer-door'>
        <section class='inner-door2'>
          <div class='backDoor rounded-circle'>
            <a href='#produkter-whiskey'>
              <p class='text-center pt-4'>Till whiskeyälskaren!</p>
            </a>
            <div class='door green-door d-flex align-items-center justify-content-center rounded-circle'>
              <p class="pt-3">Present till far?</p>
            </div>
          </div>
        </section>
      </section>
      <section class='outer-door'>
      <section class='inner-door3'>
        <div class='backDoor rounded-circle'>
          <a href='#produkter-badbomb'>
            <p class='text-center pt-3'>Grattis kära mor!</p>
          </a>
          <div class='door pink-door d-flex align-items-center justify-content-center rounded-circle'>
            <p class="pt-3">Något till mor!</p>
          </div>
        </div>
        </section>
      </section>
    `);
  } // render
} // class StartPage
