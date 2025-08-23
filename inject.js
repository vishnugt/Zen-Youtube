function setDisplayStyleUsingElementById(id, styleValue) {
    if (document.getElementById(id)) {
        document.getElementById(id).style.display = styleValue;
    }
}

function setDisplayStyleUsingElementsByClass(className, styleValue) {
    var x = document.getElementsByClassName(className);
    for (var i = 0; i < x.length; i++) {
        x[i].style.display = styleValue;
    }
}

function setDisplayForYtdReelShelfRenderer(styleValue) {
    const elements = document.querySelectorAll('ytd-reel-shelf-renderer');
    elements.forEach(element => {
        if (styleValue === 'none') {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    });
}


// Variables to control
var blockComments = 'none';
var leftSidebar = 'none';
var recommendation = 'none';
var homeFeed = 'none';
var shorts = 'none';

chrome.storage.sync.get(['block_comments', 'left_side_bar', 'recommendations', 'home_feed', 'shorts']).then((obj) => {
    blockComments = obj.block_comments == undefined ? blockComments : obj.block_comments;
    leftSidebar = obj.left_side_bar == undefined ? leftSidebar : obj.left_side_bar;
    recommendation = obj.recommendations == undefined ? recommendation : obj.recommendations;
    homeFeed = obj.home_feed == undefined ? homeFeed : obj.home_feed;
    shorts = obj.shorts == undefined ? shorts : obj.shorts;
});

function removeYoutubeElements() {

    //Comments section
    setDisplayStyleUsingElementById("comments", blockComments);

    //Home feed
    setDisplayStyleUsingElementsByClass("ytd-rich-grid-renderer", homeFeed);

    //Left side bar
    setDisplayStyleUsingElementById("guide-renderer", leftSidebar);
    setDisplayStyleUsingElementsByClass("ytd-mini-guide-renderer", leftSidebar);

    //Recommendations
    setDisplayStyleUsingElementById("related", recommendation);
    setDisplayStyleUsingElementsByClass("ytp-endscreen-content", recommendation);

    //Shorts
    setDisplayStyleUsingElementsByClass("ytd-rich-section-renderer", shorts);
    setDisplayForYtdReelShelfRenderer(shorts);
    
}

let observer = new MutationObserver((mutations) => {
    removeYoutubeElements();
})

observer.observe(document, {
    childList: true,
    subtree: true
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {
        oldValue,
        newValue
    }
    ] of Object.entries(changes)) {

        if (key == "block_comments") {
            blockComments = newValue;
        }

        if (key == "left_side_bar") {
            leftSidebar = newValue;
        }

        if (key == "recommendations") {
            recommendation = newValue;
        }

        if (key == "home_feed") {
            homeFeed = newValue;
        }

        if (key == "shorts") {
            shorts = newValue;
        }
    }
    removeYoutubeElements();
});
