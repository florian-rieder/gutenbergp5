=== Gutenberg p5.js Block ===
Contributors: florian-rieder
Tags: p5js, processing, generative art, creative coding, visual data, javascript
Requires at least: 6.1
Tested up to: 6.1
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds a Gutenberg block to add custom p5.js code in your pages and preview it as you edit.

== Description ==

This p5.js Gutenberg block plugin is the perfect tool for showcasing your generative art or adding an extra level of visual interest to your website. With p5.js, you can create interactive, dynamic, and customizable visuals that will keep your audience engaged and excited. Whether you're an artist, designer, or developer, this plugin makes it easy to integrate your p5.js sketches into your WordPress website. Impress your visitors with your stunning generative art and take your website to the next level with our p5.js Gutenberg block plugin.

* Currently, this plugin does not work with `createCanvas(windowWidth, windowHeight)`. You'll need to use actual integer values like, `createCanvas(700, 400)`.
* Currently, this plugin does not include the `p5.dom.js` or the `p5.sound.js` libraries.

This project uses the p5.js library which is free software under the [GPL License](http://p5js.org/copyright.html).


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the ‘Plugins’ screen in WordPress.


== Frequently Asked Questions ==

= Q: Does this plugin require a configuration ? =

A: No ! Just activate the plugin, add the p5.js block to any page or post to get started.

= Q: Where can I contribute to the project? =

A: You can find the GitHub Repository of this plugin here: https://github.com/florian-rieder/gutenbergp5


== Screenshots ==

1. Insert the p5.js block in the editor and edit the code.
2. Preview the results from within the editor.

== Changelog ==

1.0.0 - Released working block with sizing, layout and scrollbar settings.

== Acknowledgements ==

This plugin is similar to Mark Uraine's p5js block (https://wordpress.org/plugins/wp-p5js-block/), and is in fact reverse engineered from it, although very little of the actual code is reused (see [mapk/p5js-block](https://github.com/mapk/p5js-block)). I was prompted to develop this plugin due to encountering bugs, lack of display options, and mostly the lack of updates and support for this original plugin. I feel like it should be easier to insert p5.js artworks into Wordpress websites and blogs, and this is my contribution to it (although it may very well be buggy, but I try my best. Feel free to open an issue or a pull request).