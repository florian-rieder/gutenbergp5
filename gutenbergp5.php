<?php
/**
 * Plugin Name:       Easy p5.js Block
 * Description:       Adds a Gutenberg block to easily add custom p5.js code in your pages and preview it as you edit.
 * Keywords:          p5js, Generative Art, Creative Coding, Processing, Visual Data, Javascript, Block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Florian Rieder
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenbergp5
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_gutenbergp5_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_gutenbergp5_block_init' );

function gutenbergp5_iframe_sizer_enqueue() {
    wp_enqueue_script(
        'gutenbergp5-iframe-sizer',
        plugins_url( '/assets/js/iframe-sizer.js', __FILE__ ),
        array( 'jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-dom-ready'),
        '1.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'gutenbergp5_iframe_sizer_enqueue' );
