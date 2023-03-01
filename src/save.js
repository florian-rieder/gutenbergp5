/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import { SandBox } from '@wordpress/components';

import he from 'he';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
    return null;
    // const blockProps = useBlockProps.save({
    //     className: `gutenbergp5-block-p5js gutenbergp5-align-${attributes.alignment}`,
    // });

    // const htmlContent = `
    //     <!DOCTYPE html>
    //     <html>
    //         <head><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script></head>
    //         <body style="padding: 0; margin: 0;"></body>
    //         <script>
    //             ${he.decode(attributes.sketch)}
    //         </script>
    //     </html>
    //     `;

    // return (
    //     <RawHTML>
	// 	<>
	// 		<SandBox html={ htmlContent }/>
	// 		{ /*
	// 			An overlay is added when the block is not selected in order to register click events.
	// 			Some browsers do not bubble up the clicks from the sandboxed iframe, which makes it
	// 			difficult to reselect the block.
	// 		*/ }
	// 		{/* { ! isSelected && (
	// 			<div className="block-library-html__preview-overlay"></div>
	// 		) } */}
	// 	</>
    //     </RawHTML>
	// );

    //



    // {/** 
    // *  Block in consultation mode
    // */}
    // return (
    //     <div {...blockProps}>
    //         <iframe
    //             sandbox="allow-scripts allow-same-origin allow-presentation"
    //             frameBorder="0"
    //             srcDoc={iframeHtml}
    //             scrolling={attributes.hasScrollbar ? "yes" : "no"} // legacy or sth
    //             style={"width:" + attributes.alignment == "wide" ? "100%" : attributes.width + "; height: " + attributes.height + ";" + attributes.hasScrollbar ? "" : "overflow:hidden;"}
    //             width={attributes.alignment == "wide" ? "100%" : attributes.width}
    //             height={attributes.height}
    //             className={attributes.width || attributes.height ? "gutenbergp5-noresize" : ""}
    //         />
    //     </div>
    // );
}
