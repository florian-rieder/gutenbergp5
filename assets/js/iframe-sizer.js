document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".wp-block-gutenbergp5-p5js iframe").forEach((frame) => {
        if (frame.classList.contains("gutenbergp5-noresize")) return;
        frame.addEventListener('load', function () {
            p5js__resizeIframe(this);
        });
    });
})

// let's just double it with the good ol' method to make sure it really resizes 
// right (the first method has a consistent bug on chromium-based browsers)
// For some reason this is resolves the problem for chrome... idk why.
jQuery(document).ready(function () {
    let p5Iframes = document.querySelectorAll(".wp-block-gutenbergp5-p5js iframe");
    p5Iframes.forEach((frame) => {
        if (frame.classList.contains("gutenbergp5-noresize")) return;
        p5js__resizeIframe(frame);
    });
});

function p5js__resizeIframe(frame) {
    // get access to the DOM inside the iframe
    let iframeDocument = frame.contentDocument || frame.contentWindow.document;
    // resize iframe to fit canvas
    const canvas = iframeDocument.querySelector("canvas");
    if (!canvas) {
        setTimeout(() => p5js__resizeIframe(frame), 5);
        return;
    }
    frame.width = canvas.style.width;
    frame.height = canvas.style.height;
    frame.setAttribute("style", "width:" + canvas.style.width + "; height:" + canvas.style.height + "; overflow: hidden;")
}
