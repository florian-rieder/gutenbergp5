/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

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
    //const blockProps = useBlockProps.save();
    const blockProps = useBlockProps.save({
        className: `wp-block-p5js gutenbergp5-align-${attributes.alignment}`,
    });

    const iframeHtml = `
        <!DOCTYPE html>
        <html>
            <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
            </head>
            <body style="padding: 0; margin: 0;"></body>
            <footer>
                <script>
                    ${he.decode(attributes.sketch)}
                </script>
            </footer>
        </html>
        `;


    return (
        <div {...blockProps}>
            <iframe
                frameBorder="0"
                srcDoc={iframeHtml}
                scrolling={attributes.hasScrollbar ? "yes" : "no"} // legacy or sth
                style={"width:" + attributes.alignment == "wide" ? "100%" : attributes.width + "; height: " + attributes.height + ";" + attributes.hasScrollbar ? "" : "overflow:hidden;"}
                width={attributes.alignment == "wide" ? "100%" : attributes.width}
                height={attributes.height}
                className={attributes.width || attributes.height ? "gutenbergp5-noresize" : "" }
            />
        </div>
    );

}

    // return <div className={ `gutenbergp5-align-${ attributes.alignment }` }{ ...blockProps }>
    //         <SandBox html={
    //                 '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>' +
    //                 '<script>' + attributes.sketch + '</script>'
    //             } />
    //     </div>;

    // return (
    //     <div className="wp-block-p5js">
    //       <iframe
    //         //title="My iframe"
    //         //width="100%"
    //         //height="400px"
    //         frameBorder="0"
    //         // dangerouslySetInnerHTML={{ __html:
    //         //     '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>' +
    //         //     '<script>' + attributes.sketch + '</script>'
    //         //   }}
    //         scrolling = {attributes.scrolling}
    //         src={`data:text/html;charset=utf-8,${encodeURIComponent('<!DOCTYPE html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script></head><body><script>' + attributes.sketch + '</script></body></html>')}`}
    //       />
    //     </div>
    //   );