/**
 * Runs once before all tests: logs in as admin (the session is saved to
 * STORAGE_STATE_PATH and reused by every test) and resets the test site.
 *
 * Based on the global setup shipped with @wordpress/scripts.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright/global-setup.js
 */
const { request } = require( '@playwright/test' );
const { RequestUtils } = require( '@wordpress/e2e-test-utils-playwright' );

module.exports = async function globalSetup( config ) {
	const { storageState, baseURL } = config.projects[ 0 ].use;
	const storageStatePath =
		typeof storageState === 'string' ? storageState : undefined;

	const requestContext = await request.newContext( { baseURL } );
	const requestUtils = new RequestUtils( requestContext, {
		storageStatePath,
	} );

	// Authenticate and save the storage state for the tests.
	await requestUtils.setupRest();

	await Promise.all( [
		requestUtils.activatePlugin( 'easy-p5-js-block' ),
		requestUtils.deleteAllPosts(),
	] );

	await requestContext.dispose();
};
