function processChildElementsRecursively(node) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        processChildElementsRecursively(child);

        if (typeof node.matches == 'function' && node.matches('[href*="explore"]')) {
            node.style.pointerEvents = "none";
        }
    }
}

// Create observer with callback function
const callback = function (mutations, observer) {
    // Iterate over every DOM mutation
    for (let mutation of mutations) {
        // Iterate over all added nodes in a mutation
        for (let node of mutation.addedNodes) {
			processChildElementsRecursively(node);
        }
    }
};
const mutationObserver = new MutationObserver(callback);

// Start oberserving every change in the DOM
const element = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };
mutationObserver.observe(element, config);

if (window.location.href.includes("/explore")) {
    var div = document.createElement('div');
    div.style.position = "fixed";
    div.style.width = "100vw";
    div.style.top = "0";
    div.style.left = "0";
    div.style.height = "100vh";
    div.style.zIndex = "9999";
    div.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    document.querySelector('body').appendChild(div);
}

var links = document.querySelectorAll('[href*="explore"]');
links.forEach((link) => {
    link.style.pointerEvents = "none";
});