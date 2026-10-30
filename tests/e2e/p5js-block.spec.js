/**
 * End-to-end tests for the p5.js block: editor, preview, and the published
 * post ("consultation" mode). Run on Chromium, Firefox and WebKit, see
 * playwright.config.js.
 */
const fs = require( 'node:fs' );
const path = require( 'node:path' );
const { test, expect } = require( '@wordpress/e2e-test-utils-playwright' );

const BLOCK_NAME = 'gutenbergp5/p5js';

// A sketch that draws once in a single color, so the result is predictable
// in every browser. It contains characters that must survive being embedded
// in the iframe's HTML (`<`, `>`, `&`, quotes): if they get mangled, the
// sketch throws and nothing is drawn.
const SKETCH = `function setup() {
  createCanvas(320, 240);
  // "quotes", 'quotes', <tags> & entities
  if (1 < 2 && 3 > 2) {
    background(255, 0, 0);
  }
  noLoop();
}`;

/**
 * Returns the block's iframe on the front end, once p5.js has created its
 * canvas inside it.
 *
 * @param {Object} page Playwright page.
 */
async function getFrontEndFrame( page ) {
	const iframe = page.locator( '.wp-block-gutenbergp5-p5js iframe' );
	await expect( iframe.contentFrame().locator( 'canvas' ) ).toBeVisible();
	return iframe;
}

/**
 * Reads the color of the canvas' center pixel inside the given iframe.
 *
 * @param {Object} iframe Playwright locator of the iframe.
 */
function getCenterPixel( iframe ) {
	return iframe
		.contentFrame()
		.locator( 'canvas' )
		.evaluate( ( canvas ) => {
			const context = canvas.getContext( '2d' );
			return Array.from(
				context.getImageData(
					Math.floor( canvas.width / 2 ),
					Math.floor( canvas.height / 2 ),
					1,
					1
				).data
			);
		} );
}

/**
 * Publishes the post, then opens it on the front end.
 *
 * @param {Object} fixtures        Test fixtures.
 * @param {Object} fixtures.editor Editor fixture.
 * @param {Object} fixtures.page   Page fixture.
 */
async function publishAndView( { editor, page } ) {
	const postId = await editor.publishPost();
	// WebKit sometimes never fires `load` on this page (about 1 in 4 runs,
	// with or without special characters in the sketch), although the
	// sketches run. The tests wait for the canvas instead.
	await page.goto( `/?p=${ postId }`, { waitUntil: 'domcontentloaded' } );
}

test.describe( 'p5.js block', () => {
	test.beforeEach( async ( { admin } ) => {
		await admin.createNewPost();
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await requestUtils.deleteAllPosts();
	} );

	test( 'can be inserted with the default sketch', async ( { editor } ) => {
		await editor.insertBlock( { name: BLOCK_NAME } );

		const sketchEditor = editor.canvas.getByRole( 'textbox', {
			name: 'p5.js Sketch Editor',
		} );
		await expect( sketchEditor ).toBeVisible();
		await expect( sketchEditor ).toHaveValue( /createCanvas\(600, 600\)/ );
	} );

	test( 'saves the sketch typed in the editor', async ( { editor } ) => {
		await editor.insertBlock( { name: BLOCK_NAME } );

		await editor.canvas
			.getByRole( 'textbox', { name: 'p5.js Sketch Editor' } )
			.fill( SKETCH );

		await expect
			.poll( editor.getBlocks )
			.toMatchObject( [
				{ name: BLOCK_NAME, attributes: { sketch: SKETCH } },
			] );
	} );

	test( 'previews the sketch in the editor', async ( { editor } ) => {
		await editor.insertBlock( {
			name: BLOCK_NAME,
			attributes: { sketch: SKETCH },
		} );

		await editor.clickBlockToolbarButton( 'Preview' );

		const preview = editor.canvas.locator(
			`[data-type="${ BLOCK_NAME }"] iframe`
		);
		const canvas = preview.contentFrame().locator( 'canvas' );
		await expect( canvas ).toBeVisible();
		// CSS size: on retina screens (WebKit) p5.js doubles the pixel size.
		await expect( canvas ).toHaveCSS( 'width', '320px' );
		expect( await getCenterPixel( preview ) ).toEqual( [ 255, 0, 0, 255 ] );

		// Back to the code editor.
		await editor.clickBlockToolbarButton( 'Edit' );
		await expect(
			editor.canvas.getByRole( 'textbox', {
				name: 'p5.js Sketch Editor',
			} )
		).toHaveValue( SKETCH );
	} );

	test( 'saves the frame settings from the sidebar', async ( {
		editor,
		page,
	} ) => {
		await editor.insertBlock( { name: BLOCK_NAME } );
		await editor.openDocumentSettingsSidebar();

		const settings = page.getByRole( 'region', {
			name: 'Editor settings',
		} );
		await settings
			.getByRole( 'checkbox', { name: 'Show scroll bar' } )
			.check();
		await settings
			.getByRole( 'spinbutton', { name: 'Width' } )
			.fill( '500' );
		await settings
			.getByRole( 'spinbutton', { name: 'Height' } )
			.fill( '300' );

		await expect.poll( editor.getBlocks ).toMatchObject( [
			{
				name: BLOCK_NAME,
				attributes: {
					hasScrollbar: true,
					width: '500px',
					height: '300px',
				},
			},
		] );
	} );

	test( 'saves the alignment from the toolbar', async ( {
		editor,
		page,
	} ) => {
		await editor.insertBlock( { name: BLOCK_NAME } );

		await editor.clickBlockToolbarButton( 'Alignment' );
		await page.getByRole( 'menuitem', { name: 'Left' } ).click();

		await expect
			.poll( editor.getBlocks )
			.toMatchObject( [
				{ name: BLOCK_NAME, attributes: { alignment: 'left' } },
			] );
	} );

	// Posts on existing sites were saved by older versions of the plugin. If
	// save.js changes its markup without a deprecation, these blocks become
	// invalid in the editor.
	//
	// The fixture is the post content serialized by version 1.1.3 (a default
	// block, and one with every setting changed), with the URL of p5.min.js
	// replaced by {{P5_SCRIPT_URL}}, since it depends on the plugin folder.
	test( 'opens posts saved with version 1.1.3', async ( {
		admin,
		page,
		requestUtils,
	} ) => {
		// Set by the plugin in the editor opened by beforeEach.
		const p5ScriptUrl = await page.evaluate( () => window._p5ScriptUrl );
		const content = fs
			.readFileSync(
				path.join( __dirname, 'fixtures/post-content-1.1.3.html' ),
				'utf8'
			)
			.replaceAll( '{{P5_SCRIPT_URL}}', p5ScriptUrl );
		const post = await requestUtils.createPost( {
			content,
			status: 'publish',
		} );
		await admin.editPost( post.id );

		await expect
			.poll( () =>
				page.evaluate( () =>
					window.wp.data
						.select( 'core/block-editor' )
						.getBlocks()
						.map( ( block ) => [ block.name, block.isValid ] )
				)
			)
			.toEqual( [
				[ BLOCK_NAME, true ],
				[ BLOCK_NAME, true ],
			] );
	} );

	test.describe( 'on the published post', () => {
		test( 'runs the sketch and sizes the frame to the canvas', async ( {
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: BLOCK_NAME,
				attributes: { sketch: SKETCH },
			} );
			await publishAndView( { editor, page } );

			const iframe = await getFrontEndFrame( page );
			expect( await getCenterPixel( iframe ) ).toEqual( [
				255, 0, 0, 255,
			] );

			// iframe-sizer.js resizes the frame to the canvas.
			await expect
				.poll( async () => {
					const box = await iframe.boundingBox();
					return [ box.width, box.height ];
				} )
				.toEqual( [ 320, 240 ] );
		} );

		test( 'uses the fixed size from the settings', async ( {
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: BLOCK_NAME,
				attributes: {
					sketch: SKETCH,
					width: '500px',
					height: '300px',
				},
			} );
			await publishAndView( { editor, page } );

			const iframe = await getFrontEndFrame( page );
			await expect( iframe ).toHaveClass( /gutenbergp5-noresize/ );
			const box = await iframe.boundingBox();
			expect( [ box.width, box.height ] ).toEqual( [ 500, 300 ] );
		} );

		test( 'shows a scroll bar only when enabled', async ( {
			editor,
			page,
		} ) => {
			await editor.insertBlock( {
				name: BLOCK_NAME,
				attributes: { sketch: SKETCH },
			} );
			await editor.insertBlock( {
				name: BLOCK_NAME,
				attributes: { sketch: SKETCH, hasScrollbar: true },
			} );
			await publishAndView( { editor, page } );

			const iframes = page.locator( '.wp-block-gutenbergp5-p5js iframe' );
			await expect( iframes.nth( 0 ) ).toHaveAttribute(
				'scrolling',
				'no'
			);
			await expect( iframes.nth( 1 ) ).toHaveAttribute(
				'scrolling',
				'yes'
			);
		} );

		// Left is also the flex default, so it passes without the
		// `gutenbergp5-align-left` rule; it guards against other rules
		// overriding it.
		for ( const alignment of [ 'left', 'center', 'right', 'wide' ] ) {
			test( `aligns the block ${ alignment }`, async ( {
				editor,
				page,
			} ) => {
				// Full width gives the frame the whole width, so that sketches
				// can fill it with `windowWidth`.
				const sketch =
					alignment === 'wide'
						? SKETCH.replace( '320', 'windowWidth' )
						: SKETCH;
				await editor.insertBlock( {
					name: BLOCK_NAME,
					attributes: { sketch, alignment },
				} );
				await publishAndView( { editor, page } );

				const block = page.locator( '.wp-block-gutenbergp5-p5js' );
				await expect( block ).toHaveClass(
					new RegExp( `gutenbergp5-align-${ alignment }` )
				);

				const iframe = await getFrontEndFrame( page );
				const blockBox = await block.boundingBox();

				if ( alignment === 'wide' ) {
					// The frame breaks out of the theme's content column and
					// spans the whole viewport (100vw, which can be wider
					// than clientWidth by the width of a scroll bar).
					const viewportWidth = await page.evaluate(
						() => document.documentElement.clientWidth
					);
					const frameBox = await iframe.boundingBox();
					expect( frameBox.x ).toBeLessThanOrEqual( 0 );
					expect(
						frameBox.x + frameBox.width
					).toBeGreaterThanOrEqual( viewportWidth );
					return;
				}

				await expect
					.poll( async () => ( await iframe.boundingBox() ).width )
					.toBe( 320 );
				const frameBox = await iframe.boundingBox();
				const position = {
					left: frameBox.x - blockBox.x,
					center:
						frameBox.x +
						frameBox.width / 2 -
						( blockBox.x + blockBox.width / 2 ),
					right:
						frameBox.x +
						frameBox.width -
						( blockBox.x + blockBox.width ),
				}[ alignment ];
				expect( Math.abs( position ) ).toBeLessThan( 2 );
			} );
		}
	} );
} );
