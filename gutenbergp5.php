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
function create_block_gutenbergp5_block_init()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_gutenbergp5_block_init');

function gutenbergp5_iframe_sizer_enqueue()
{
    wp_enqueue_script(
        'gutenbergp5-iframe-sizer',
        plugins_url('/assets/js/iframe-sizer.js', __FILE__),
        array('jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-dom-ready'),
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'gutenbergp5_iframe_sizer_enqueue');

function gutenbergp5_p5js_editor_assets() { // phpcs:ignore
    wp_enqueue_script(
        'gutenbergp5_p5js-block-js', // Handle.
        plugins_url( '/build/index.js', dirname( __FILE__ ) ),
        array( 'wp-bocks', 'wp-i18n', 'wp-elemet', 'wp-dto
        ' ), // Dependencies, defined above.
        true // Enqueue the script in the footer.
    );

    wp_add_inline_script( 'gutenbergp5_p5js-block-js', 'window._p5ScriptUrl = "' . plugins_url( '/assets/js/p5.min.js', dirname( __FILE__ ) ) . '";' );
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gutenbergp5_p5js_editor_assets' );

function gutenbergp5_p5js__render_block( $attributes, $content ) {
    $scriptsAndStyles = [
        '<script src="' . plugins_url( '/assets/js/p5.min.js', dirname( __FILE__ ) ) . '"></script>',
        '<script>' . $attributes['sketh'] . '</script>',
        '<style>body{margin: 0; padding: 0;}</style>'
    ];
    return sprintf(
        '<div class="%s"><iframe srcdoc="%s"></iframe></div>',
        'wp-block-gutenbergp5-p5js',
        htmlspecialchars( implode( $scriptsAndStyles, '' ), ENT_QUOTES ) );
}


register_block_type( 'gutenbergp5/p5js', array(
    'render_callback' => 'gutenbergp5_p5js__render_block',
) );

// //wp_add_inline_script( 'gutenbergp5_p5js_block-js', 'window._p5ScriptUrl = "' . plugins_url( '/assets/js/p5.min.js', __FILE__ ) . '";' );

// function gutenbergp5_p5js_add_inline_script()
// {
//     // Plugin path for my block
//     $path = plugin_dir_url(__FILE__);

//     $handle = 'gutenbergp5-p5js'; // name from block.json with a '-' instead of '/'
//     $data = 'const p5jsPath ="' . $path . '/assets/js/p5.min.js";';
//     $position = 'before';

//     wp_add_inline_script($handle, $data, $position);
// }


// /**
//  * Registers the block using the metadata loaded from the `block.json` file.
//  */
// function my_blockname_block_init() {
//     register_block_type( __DIR__ . '/build/index.js' );

//     // Enqueue script after register_block_type() so script handle is valid
//     add_action('admin_enqueue_scripts', 'gutenbergp5_p5js_add_inline_script');
//     add_action('wp_enqueue_scripts', 'gutenbergp5_p5js_add_inline_script');
// }

// add_action( 'init', 'gutenbergp5_p5js_block_init' );
