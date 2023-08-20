# Gutenbergp5 - Easy p5.js Block

- Contributors:      Florian Rieder
- Tags:              p5js, Processing, Generative Art, Creative Coding, Javascript
- Tested up to:      6.3
- Stable tag:        1.1.2
- License:           GPL-2.0-or-later
- License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Adds a Gutenberg block to add custom p5.js code in your pages and preview it as you edit.

Find this plugin in the [Wordpress Plugin Directory](https://wordpress.org/plugins/easy-p5-js-block/).

## Description

This p5.js Gutenberg block plugin is the perfect tool for showcasing your generative art or adding an extra level of visual interest to your website. With [p5.js](https://p5js.org/), you can create interactive, dynamic, and customizable visuals that will keep your audience engaged and excited. Whether you're an artist, designer, or developer, this plugin makes it easy to integrate your p5.js sketches into your WordPress website. Impress your visitors with your stunning generative art and take your website to the next level with our p5.js Gutenberg block plugin.


## Acknowledgements
This plugin is similar to [Mark Uraine's p5js block](https://wordpress.org/plugins/wp-p5js-block/), and is in fact reverse engineered from it, although very little of the actual code is reused (see [mapk/p5js-block](https://github.com/mapk/p5js-block), and his [blog post about his plugin](https://markuraine.com/creating-the-p5-js-gutenberg-block/)). I was prompted to develop this plugin due to encountering bugs, lack of display options, and mostly the lack of updates and support for this original plugin. I feel like it should be easier to insert p5.js artworks into Wordpress websites and blogs, and this is my contribution to it (although it may be buggy, I try my best. Feel free to open an issue or a pull request).

This project uses the p5.js library version 1.7.0, which is free software under the [GPL License](http://p5js.org/copyright.html). Currently, this plugin does not include the `p5.sound.js` libraries.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/gutenbergp5` directory, or install the plugin through the WordPress plugins screen directly.

2. Activate the plugin through the 'Plugins' screen in WordPress

## Usage

1. In the WordPress editor, create or edit a page where you want to add the p5.js block.
2. Add a new block and search for "p5.js block" or locate it under the "Media" category.
3. Configure the block settings, including your custom p5.js code.
4. Preview and publish the page to see your p5.js artwork in action.


## Contribute

If you would like to contribute to the development of Gutenbergp5, you are welcome to do so. Follow the instructions below to set up the development environment:

1. Clone the repository:

```bash
git clone https://github.com/florian-rieder/gutenbergp5.git
```
2. Navigate to the plugin directory:
```bash
cd gutenbergp5
```
3. Install the dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run start
```
5. Build the plugin files:
```bash
npm run build
```

Feel free to explore the code, open issues, or submit pull requests to contribute to the improvement of the plugin. Your contributions are greatly appreciated!

## Screenshots

![Edit mode](https://raw.githubusercontent.com/florian-rieder/gutenbergp5/master/assets/screenshot-1.png)
![Preview mode](https://raw.githubusercontent.com/florian-rieder/gutenbergp5/master/assets/screenshot-2.png)
![Full width setting](https://raw.githubusercontent.com/florian-rieder/gutenbergp5/master/assets/screenshot-3.png)

## Changelog

### 1.1.2
* Moved p5.js dependency to a local asset instead of using a CDN link.
* Fixed overflow with full width option.

### 1.1.1
* Speculative fix for a bug where the canvas sizing would fail on chromium-based browsers.

### 1.1.0

* Added a "Full width" alignment option.
* Fixed a bug where the iframe sizer would sometimes fail, because the iframe had not yet loaded.

### 1.0.0

* Released working block with sizing, layout and scrollbar settings.

## License

Gutenbergp5 is licensed under the [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html) license.
