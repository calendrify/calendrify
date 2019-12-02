class App {
  /*
  
    I am an App.

    I am a router... I display the correct page content.
    I also read all the products from json
    and create routes for them too.
    All routes will replace the content
    in the main-tag :)
  */

  constructor() {
    // This are some routes:
    // * the keys are url hashes
    // * the values are instances of classes
    // A shop should always a cart manager
    this.cartManager = new CartManager();

    // (we will add more routes when we have read
    //  the products from JSON)
    this.routes = {
      "": new StartPage(),
      omoss: new AboutUs(),
      page404: new Page404(),
      addressform: new AddressForm(this.cartManager),
      confirmation: new Confirmation(),
      cart: null // Make space for the cart, but we will create the object and update the table in loadProcucts
    };

    // Listen to hash changes - rerender...
    $(window).on("hashchange", () => this.changeRoute());
    // Load the products from JSON
    this.loadProducts();
  } // constructor

  changeRoute() {
    // Get the hash from the url - remove the #-sign
    let hash = location.hash.replace(/#/g, "");
    // The first part of the hash is everything before a '-' character
    let hashFirstPart = hash.split("-")[0];
    // Look up the "page to show" - the instance to call render on
    // if we do not find any page set the page to 'page404'
    let pageToShow = this.routes[hash] || this.routes.page404;
    // Make the correct menu item active
    // (the css selector finds a-tags with matching hrefs)
    $("header nav a").removeClass("active");
    $(`header nav a[href="#${hashFirstPart}"]`).addClass("active");

    // Deactivate tooltips (otherwise any active tooltip on the Kalendrar page will stay put until reload of the page)
    $('[data-toggle="tooltip"]').tooltip("dispose");

    // Render content
    pageToShow.render();

    // Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();
  } // changeRoute

  // An async function is allowed to await things
  // Loading data from JSON takes time
  // await "pauses" until we have have a result
  async loadProducts() {
    // Load the products from JSON
    let productsData = await $.getJSON("/json/products.json");
    // We will convert the raw JSON data to instances of Product
    // and store them in this.products
    this.products = [];
    // Loop through the JSON data and create Products
    for (let productData of productsData) {
      let product = new Product(productData, this.cartManager);
      this.products.push(product);
      this.routes[product.slug] = product;
    } // for...

    // Create the cart. It needs a a reference to the products-list,
    // so it can't be created before the list is created in loadProducts
    // Update the carts drop down menu and item count in the  nav-bar
    this.cart = new Cart(this.cartManager, this.products);
    this.cart.renderInDropDown();
    this.cart.updateArticleCount();
    this.routes["addressform"].setCart(this.cart);

    // Set the cart reference in the products
    for (let p of this.products) p.setCart(this.cart);

    // Update the cart in the routing table
    this.routes["cart"] = this.cart;

    // Make a new product list with all of our products
    // and add it to our routes
    this.routes.produkter = new ProductList(this.products);
    // Now we are ready to call changeRoute and display
    // the correct page on initial page load..
    this.changeRoute();
  } // loadProducts
} // class App
