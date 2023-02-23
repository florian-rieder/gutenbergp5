// jQuery( document ).ready( function() {
// 	const blocks = jQuery.find( '.wp-block-cgb-block-p5js' );
// 	jQuery.each( blocks, function() {
// 		const block = jQuery( this );
// 		const iFrame = jQuery( block ).find( 'iframe' );
// 		jQuery( iFrame ).on( 'load', function() {
// 			const iFrameBody = jQuery( this ).get( 0 ).contentWindow.document.body;
// 			jQuery( iFrame, block ).height( jQuery( iFrameBody ).find( 'canvas' ).height() + 5 );
// 		} );
// 	} );
// } );

console.log("I'm loaded !!!!");

jQuery(document).ready(function () {
    setTimeout(() => {
        let p5Iframes = document.querySelectorAll(".wp-block-p5js iframe");
        p5Iframes.forEach((frame) => {
            var iframeDocument = frame.contentDocument || frame.contentWindow.document; // get access to the DOM inside the iframe
            const canvas = iframeDocument.querySelector("canvas");
            frame.width = canvas.style.width;
            frame.height = canvas.style.height;
            frame.setAttribute("style", "width:" + canvas.style.width + "; height:" + canvas.style.height + "; overflow: hidden;")
        });
    }, 100);
});