jQuery(document).ready(function () {
    setTimeout(() => {
        let p5Iframes = document.querySelectorAll(".gutenbergp5-block-p5js iframe");
        p5Iframes.forEach((frame) => {
            var iframeDocument = frame.contentDocument || frame.contentWindow.document; // get access to the DOM inside the iframe
            const canvas = iframeDocument.querySelector("canvas");
            if (frame.classList.contains("gutenbergp5-noresize")) { return; }
            frame.width = canvas.style.width;
            frame.height = canvas.style.height;
            frame.setAttribute("style", "width:" + canvas.style.width + "; height:" + canvas.style.height + "; overflow: hidden;")
        });
    }, 100);
});