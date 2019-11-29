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
     <div class="row justify-content-between">
        <div class="col-12 col-md-4 mt-1">
          <div class="card">
               <img src="/images/kloker.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title text-center">Sofia</h5>
                <p class="card-text text-center">Hobby: Tänka...</p>
              </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-1">
          <div class="card">
            <img src="/images/grumpy.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">Janis</h5>
              <p class="card-text text-center">Hobby:Getting shit done</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-1">
          <div class="card">
            <img src="/images/trotter.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">Joacim</h5>
              <p class="card-text text-center">Hobby:Sova</p>
            </div>
          </div>
          </div>
        </div>
      <section class="row">
        <div class="col">
          <h2 class="text-primary mt-4">Julkalenderns och Calendrifys historia</h2>
          <p class="text-justify">Redan före julkalendern fanns en tradition i den protestantiska delen av Tyskland, att göra ett kritstreck på dörren för varje dag i december fram till julafton. Andra tände ett nytt ljus för varje dag, eller hängde upp en liten religiös tavla.</p>
          <p class="text-justify">Julkalenderns historia började i mitten av 1880-talet när en tysk mamma ville göra tiden fram till jul lite lättare för sin fyraårige son Gerhard. Hon gjorde i ordning en bit färgglad kartong med tjugofyra kakor på. Pojken fick sedan äta en kaka om dagen fram till jul.</p>
          <p class="text-justify">Många år senare blev Gerhard Lang delägare i ett tryckeri. Han mindes sin barndoms kak-kalender, vilket inspirerade honom till att vid 1900-talets början ge ut den första tryckta julkalendern i form av en julkalender. Dock, året innan gavs en kalender ut i form av en adventsklocka (adventuhr) i Hamburg och man kan diskutera huruvida detta var den första tryckta julkalendern eller inte. Gerhard Langs adventskalender bestod av två ark varav det ena hade tjugofyra julmotiv, som efter hand klipptes ut och fästes på motsvarande plats på det andra arket. Succén blev oväntat stor och på 1920-talet skapade Lang en ny variant med luckor och tredimensionella julkalendrar avsedda för innehåll i form av föremål. Dessa hade stadsmotiv och religiösa motiv.</p>
          <p class="text-justify">1930-talets ekonomiska depression stoppade framgångarna. Andra tryckerier hade emellertid börjat trycka julkalendrar så produktionen fortsatte fram tills andra världskrigets restriktioner och materialbrist.</p>
          <p class="text-justify">1946 tvingades Rickard Sellmer i tyska Stuttgart skaffa sig kontakter med amerikanska armén för att kunna återuppta produktionen. Sellmer lyckades på så sätt erövra den amerikanska marknaden. Hans firma lever kvar än idag och är det enda tryckeriet i Tyskland som enbart trycker julkalendrar och andra julprodukter.</p>
          <p class="text-justify">Här tar vi ett snabbt hopp i tiden till 2001, och <em>Calendrifys&copy;</em> födelse. Den startades av tre ungdomar som var trötta på att alla kalendrar var gjorda för barn, och gjorde till en början egna varianter för en mer vuxen publik till vänner och bekanta. I takt med att ryktet om deras kalenderar spreds, vidgade de sina vyer och började sälja sina kreationer via nätet, och snart två decennium senare är succén ett faktum!</p>
        </div>
     </section>
    `);
  } // render
} // class AboutUs
