=== Easy p5.js Block ===
Contributors: florianrieder
Tags: p5js, generative art, creative coding, processing, javascript, block
Requires at least: 6.1
Tested up to: 6.3
Stable tag: 1.1.2
License: GPL-2.0-or-later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds a Gutenberg block to easily add custom p5.js code in your pages and preview it as you edit.

== Description ==

This p5.js Gutenberg block plugin is the perfect tool for showcasing your generative art or adding an extra level of visual interest to your website. With [p5.js](https://p5js.org/), you can create interactive, dynamic, and customizable visuals that will keep your audience engaged and excited. Whether you're an artist, designer, or developer, this plugin makes it easy to integrate your p5.js sketches into your WordPress website. Impress your visitors with your stunning generative art and take your website to the next level with this p5.js Gutenberg block plugin.

== Acknowledgements ==

This plugin is similar to Mark Uraine's [p5.js block](https://wordpress.org/plugins/wp-p5js-block/), and is in fact reverse engineered from it, although very little of the actual code is reused (see [mapk/p5js-block](https://github.com/mapk/p5js-block)). I was prompted to develop this plugin due to encountering bugs, lack of display options, and mostly the lack of updates and support for this original plugin. I feel like it should be easier to insert p5.js artworks into Wordpress websites and blogs, and this is my contribution to it (although it may be buggy, I try my best. Feel free to ask in the support forum, or open an issue or a pull request on [Github](https://github.com/florian-rieder/gutenbergp5)).

This project uses the p5.js library version 1.7.0, which is free software under the [GPL License](http://p5js.org/copyright.html). Currently, this plugin does not include the `p5.sound.js` libraries.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the ‘Plugins’ screen in WordPress.


== Frequently Asked Questions ==

= Q: Does this plugin require a configuration ? =

A: No ! Just activate the plugin and add the p5.js block to any page or post to get started.

= Q: How should I size my canvas with this plugin ? =

A: It is recommended to define the height and width of your block in the block settings panel, and use `createCanvas(windowWidth, windowHeight)` to ensure that your sketche's sizing is responsive. However, you can define a fixed size for the canvas in your script using for example `createCanvas(600, 400)`. In this case, the size of the block will adapt to the canvas size defined in the script automatically, unless the size of the block has been defined in its setting panel.

In order for your sketch to be rendered properly when using `createCanvas(windowWidth, windowHeight)`, it is important to remember that in the context of the p5.js block, the variables `windowWidth` and `windowHeight` refer to the width and height of the block. When using dynamic sizing in your script, define the desired height and width of your canvas in the block settings panel.

Warning : when using `windowHeight`, the preview won't work. You can fix this by using an integer value (e.g. `createCanvas(windowWidth, 500)`), or leave as is, since it won't affect the final page.

= Q: How can I make a canvas that takes the full width of the window ? =

A: To achieve this effect, select the "Full width" alignment option in the block's toolbar, and use `createCanvas(windowWidth, windowHeight)` in your script. Don't forget to set the height of your canvas in the block settings panel. The width setting will be ignored.

= Q: Where can I contribute to the project? =

A: You can contribute on the [GitHub Repository](https://github.com/florian-rieder/gutenbergp5) of this plugin.


== Screenshots ==

1. Insert the p5.js block in the editor and edit the code.
2. Preview the results from within the editor.
3. Create full width sketches using the "Full width" alignment setting and `createCanvas(windowWidth, windowHeight)`

== Changelog ==

1.1.2

- Moved p5.js dependency to a local asset instead of using a CDN link.
- Updated p5.js to 1.7.0.
- Fixed horizontal overflow with full width option.
- Fixed preview overflow issues.
- Improved canvas auto-sizing.

1.1.1

- Speculative fix for a bug where the canvas sizing would fail on chromium-based browsers.

1.1.0

- Added a "Full width" alignment option.
- Fixed a bug where the canvas sizing would sometimes fail.

1.0.0

- Released working block with sizing, layout and scrollbar settings.
