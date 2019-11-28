class AboutUs {
  /*
    I am an About Us page.
    I display info about us.
  */

  render() {
    $("main").html(/*html*/ `
      <section class="row">
        <div class="col">
          <h1 class="text-primary">Om oss</h1>
            <p>Vi är litet företag som säljer ekologiska kalendrar.</p>
          </div>
          </section>
     <div class="row">
        <div class="col-12 col-md-4">
          <div class="card" style="width: 18rem;">
               <img src="/images/kloker.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title text-center">Sofia</h5>
                <p class="card-text text-center">Hobby: Tänka...</p>
              </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card" style="width: 18rem;">
            <img src="/images/grumpy.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">Janis</h5>
              <p class="card-text text-center">Hobby:Getting shit done</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card" style="width: 18rem;">
            <img src="/images/trotter.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">Joacim</h5>
              <p class="card-text text-center">Hobby:Sova</p>
            </div>
          </div>
          </div>
        </div>
    `);
  }
}
