# Gutenbergp5 - Easy p5.js Block

- Contributors:      Florian Rieder
- Tags:              p5.js, Processing, Generative Art, Creative Coding, Processing, Javascript
- Tested up to:      6.1
- Stable tag:        1.0.1
- License:           GPL-2.0-or-later
- License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Adds a Gutenberg block to add custom p5.js code in your pages and preview it as you edit.

Find this plugin in the [Wordpress Plugin Directory](https://wordpress.org/plugins/easy-p5-js-block/).

## Description

This p5.js Gutenberg block plugin is the perfect tool for showcasing your generative art or adding an extra level of visual interest to your website. With p5.js, you can create interactive, dynamic, and customizable visuals that will keep your audience engaged and excited. Whether you're an artist, designer, or developer, this plugin makes it easy to integrate your p5.js sketches into your WordPress website. Impress your visitors with your stunning generative art and take your website to the next level with our p5.js Gutenberg block plugin.

## Acknowledgements
This plugin is similar to [Mark Uraine's p5js block](https://wordpress.org/plugins/wp-p5js-block/), and is in fact reverse engineered from it, although very little of the actual code is reused (see [mapk/p5js-block](https://github.com/mapk/p5js-block), and his [blog post about his plugin](https://markuraine.com/creating-the-p5-js-gutenberg-block/)). I was prompted to develop this plugin due to encountering bugs, lack of display options, and mostly the lack of updates and support for this original plugin. I feel like it should be easier to insert p5.js artworks into Wordpress websites and blogs, and this is my contribution to it (although it may very well be buggy, but I try my best. Feel free to open an issue or a pull request).

## Installation

1. Upload the plugin files to the `/wp-content/plugins/gutenbergp5` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress

## Contribute

```
npm install

npm run start
npm run build
```

## Screenshots

![Edit mode](https://raw.githubusercontent.com/florian-rieder/gutenbergp5/master/assets/screenshot-1.png)
![Preview mode](https://raw.githubusercontent.com/florian-rieder/gutenbergp5/master/assets/screenshot-2.png)

## Changelog

### 1.0.1

* Fixed a bug where the iframe sizer would sometimes fail, because the iframe had not yet loaded.

### 1.0.0

* Released working block with sizing, layout and scrollbar settings.
