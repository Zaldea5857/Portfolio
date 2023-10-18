// scripts.js

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(function (iframe) {
            iframe.src = iframe.getAttribute('data-src');
        });
    }, 100);
});

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
    // Set the height of the iframe with id "contact" (assuming "guestbook_form" iframe has this ID)
    const contactIframe = document.getElementById("contact").querySelector("iframe");
    if (contactIframe) {
        contactIframe.style.height = "200px";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const iframes = document.querySelectorAll('iframe');

    function adjustIframeHeight(iframe) {
        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
    }

    iframes.forEach(function (iframe) {
        // Check if it's the "guestbook_form" iframe and skip it
        if (iframe.src && iframe.src.includes("guestbook_form")) {
            return;
        }

        iframe.addEventListener('load', function () {
            adjustIframeHeight(iframe);
        });
    });
});

function smoothSetIframeHeight(iframe, targetHeight, duration) {
    const startHeight = iframe.clientHeight;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const newHeight = easeInOutCubic(elapsedTime, startHeight, targetHeight - startHeight, duration);
            iframe.style.height = newHeight + "px";
            requestAnimationFrame(animate);
        } else {
            iframe.style.height = targetHeight + "px";
        }
    }

    requestAnimationFrame(animate);
}

// Easing function for smoother animation
function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

// Function to reload the page on window resize
function reloadOnResize() {
    // Define a threshold to avoid multiple refreshes during resizing
    const threshold = 200; // Adjust this value as needed

    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            location.reload();
        }, threshold);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});
