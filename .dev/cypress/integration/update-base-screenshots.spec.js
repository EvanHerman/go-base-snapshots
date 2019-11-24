var sites = [];

describe( 'Update WPNUX Go Theme Visual Regression Test Base Screenshots', () => {

  it( 'Loop through each template and store template data.', () => {

    cy.visit( 'https://wpnux.godaddy.com/v2/' );

    cy.get( '.item' ).each( function( $template ) {

      var templateLink = Cypress.$( $template ).find( 'a' ).attr( 'href' ),
          templateName = getQueryString( 'template', templateLink );

      sites.push( { 'name': templateName, 'url': templateLink } );

    } ).then( () => {

      for ( var i = 0; i < sites.length; i++ ) {

        cy.visit( sites[i].url );

        // wait for CoBlocks gallery layouts
        cy.wait( 1500 );

        // hide WooCommerce demo notice
        cy.get( 'body' ).then( ( $body ) => {
          Cypress.$( 'body' ).append( '<style>.woocommerce-store-notice.demo_store { display: none !important; }</style>' );
        } );

        cy.viewport( 'macbook-15' ); // 1440x900
        cy.wait( 1500 );
        cy.screenshot( sites[i].name + '-desktop' );

        cy.viewport( 'ipad-mini' ); // 768x1024
        cy.wait( 1500 );
        cy.screenshot( sites[i].name + '-ipad' );

        cy.viewport( 'iphone-xr' ); // 414x896
        cy.wait( 1500 );
        cy.screenshot( sites[i].name + '-iphone' );

      }

    } );

  } );

} );

var getQueryString = function ( field, url ) {
  var href   = url ? url : window.location.href,
      reg    = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' ),
      string = reg.exec(href);

  return string ? string[1] : null;
};
