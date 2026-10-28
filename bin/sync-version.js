/**
 * Copies the version from package.json into the plugin header and the
 * readme's "Stable tag". Runs automatically as the npm "version" lifecycle
 * script, so `npm version patch` bumps every version number at once.
 */
const fs = require( 'fs' );
const path = require( 'path' );

const root = path.join( __dirname, '..' );
const { version } = require( '../package.json' );

const files = {
	'gutenbergp5.php': /^( \* Version:\s+).*$/m,
	'readme.txt': /^(Stable tag:\s+).*$/m,
};

for ( const [ file, pattern ] of Object.entries( files ) ) {
	const filePath = path.join( root, file );
	const content = fs.readFileSync( filePath, 'utf8' );
	if ( ! pattern.test( content ) ) {
		throw new Error( `No version line found in ${ file }` );
	}
	fs.writeFileSync( filePath, content.replace( pattern, `$1${ version }` ) );
}
