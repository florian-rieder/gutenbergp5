/**
 * Playwright config for the end-to-end tests in tests/e2e.
 *
 * Runs against the wp-env "tests" site (http://localhost:8889), which is
 * started alongside the development site by `npm run env:start`.
 *
 * Based on the default config shipped with @wordpress/scripts.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright.config.js
 */
const path = require( 'node:path' );
const { defineConfig, devices } = require( '@playwright/test' );

process.env.WP_ARTIFACTS_PATH ??= path.join( process.cwd(), 'artifacts' );
process.env.STORAGE_STATE_PATH ??= path.join(
	process.env.WP_ARTIFACTS_PATH,
	'storage-states/admin.json'
);

module.exports = defineConfig( {
	testDir: './tests/e2e',
	outputDir: path.join( process.env.WP_ARTIFACTS_PATH, 'test-results' ),
	globalSetup: require.resolve( './tests/e2e/global-setup.js' ),
	reporter: process.env.CI
		? [ [ 'github' ], [ 'html', { open: 'never' } ] ]
		: [ [ 'list' ], [ 'html', { open: 'never' } ] ],
	forbidOnly: !! process.env.CI,
	// All browsers share one WordPress database, so tests must not run in
	// parallel or they would delete each other's posts.
	workers: 1,
	retries: process.env.CI ? 2 : 0,
	timeout: 60_000,
	reportSlowTests: null,
	use: {
		baseURL: process.env.WP_BASE_URL || 'http://localhost:8889',
		headless: true,
		viewport: { width: 1280, height: 960 },
		ignoreHTTPSErrors: true,
		locale: 'en-US',
		contextOptions: { reducedMotion: 'reduce', strictSelectors: true },
		storageState: process.env.STORAGE_STATE_PATH,
		actionTimeout: 10_000,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
	},
	projects: [
		{ name: 'chromium', use: { ...devices[ 'Desktop Chrome' ] } },
		{ name: 'firefox', use: { ...devices[ 'Desktop Firefox' ] } },
		{ name: 'webkit', use: { ...devices[ 'Desktop Safari' ] } },
	],
} );
