function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeElementById(id) {
    const element = document.getElementById(id);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

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

// Variables to control
var blockComments = 'none';
var leftSidebar = 'none';
var recommendation = 'none';
var homeFeed = 'none';

chrome.storage.sync.get(['block_comments', 'left_side_bar', 'recommendations', 'home_feed'], function (obj) {
    blockComments = obj.block_comments = undefined ? blockComments : obj.block_comments;
    leftSidebar = obj.leftSidebar == undefined ? leftSidebar : obj.leftSidebar;
    recommendation = obj.recommendation == undefined ? recommendation : obj.recommendation;
    homeFeed = obj.homeFeed == undefined ? homeFeed : obj.homeFeed;
});

function removeYoutubeElements() {

    //Comments section
    setDisplayStyleUsingElementById("comments", blockComments);

    //Home feed
    setDisplayStyleUsingElementsByClass("ytd-rich-grid-renderer", homeFeed);

    //Left side bar
    setDisplayStyleUsingElementById("guide-renderer", leftSidebar);

    //Recommendations
    setDisplayStyleUsingElementById("related", recommendation);
    setDisplayStyleUsingElementsByClass("ytp-endscreen-content", recommendation);
}

let observer = new MutationObserver((mutations) => {
    removeYoutubeElements();
})

observer.observe(document, {
    childList: true,
    subtree: true
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let[key, {
                oldValue,
                newValue
            }
        ]of Object.entries(changes)) {

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
    }
    removeYoutubeElements();
});
