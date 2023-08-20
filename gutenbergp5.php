<?php
/**
 * Plugin Name:       Easy p5.js Block
 * Description:       Adds a Gutenberg block to easily add custom p5.js code in your pages and preview it as you edit.
 * Keywords:          p5js, Generative Art, Creative Coding, Processing, Javascript, Block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.2.0
 * Author:            Florian Rieder
 * Author URI:        https://florianrieder.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenbergp5
 *
 * @package           create-block
 */


function gutenbergp5_block_editor_assets()
{
    // Enqueue block editor styles and scripts here
    wp_enqueue_script(
        'gutenbergp5-p5js-editor-script',
        plugins_url('gutenbergp5/build/index.js', dirname(__FILE__)),
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
        '1.0',
        true
    );

    $p5_url = plugins_url('gutenbergp5/assets/js/p5.min.js', dirname(__FILE__));
    $script = 'window._p5ScriptUrl = "' . $p5_url . '";';
    wp_add_inline_script('gutenbergp5-p5js-editor-script', $script);
}
add_action('enqueue_block_editor_assets', 'gutenbergp5_block_editor_assets');


/**
 * Enqueues the iframe sizer client-side javascript code, which resizes
 * the iframe to fit the canvas size, except if the iframe has the class
 * "gutenbergp5-noresize".
 */
function gutenbergp5_iframe_sizer_enqueue()
{
    wp_enqueue_script(
        'gutenbergp5-iframe-sizer',
        plugins_url('gutenbergp5/assets/js/iframe-sizer.js', __FILE__),
        array('jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-dom-ready'),
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'gutenbergp5_iframe_sizer_enqueue');


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gutenbergp5_p5js_block_init()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'gutenbergp5_p5js_block_init');