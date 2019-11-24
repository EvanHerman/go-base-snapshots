// cypress/plugins/index.js

const fs    = require( 'fs' );
const rmdir = require( 'rmdir' );

module.exports = ( on, config ) => {
  on( 'after:screenshot', ( details ) => {
    const newPath = process.cwd() + '/snapshots/' + details.name + '.png';

    return new Promise( ( resolve, reject ) => {
      fs.rename( details.path, newPath, ( err ) => {
        if ( err ) {
          return reject( err );
        }
        // because we renamed/moved the image, resolve with the new path so it is accurate in the test results
        resolve( { path: newPath } );
      } );

      // Remove the screenshots directory
      rmdir( process.cwd() + '/.dev/cypress/screenshots/' );
    } );
  } );
}
