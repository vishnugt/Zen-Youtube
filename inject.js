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
    document.getElementById(id).style.display = styleValue;
}

function setDisplayStyleUsingElementsByClass(className, styleValue) {
    var x = document.getElementsByClassName(className);
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = styleValue;
    }
}

// Variables to control
var blockComments = true;
var leftSidebar = true;
var recommendation = true;
var homeFeed = true;

chrome.storage.sync.get(['block_comments', 'left_side_bar', 'recommendations', 'home_feed'], function (obj) {
    blockComments = obj.block_comments;
    leftSidebar = obj.left_side_bar;
    recommendation = obj.recommendations;
    homeFeed = obj.home_feed;
});

function removeYoutubeElements() {
    // Comments Section
    if (document.getElementById("comments")) {
        if (blockComments) {
            //document.getElementById("comments").style.display = 'none';
            setDisplayStyleUsingElementById("comments", 'none');
        } else {
            //document.getElementById("comments").style.display = '';
            setDisplayStyleUsingElementById("comments", '');
        }
    }

    // Home Feed
    if (document.getElementsByClassName("ytd-rich-grid-renderer")) {
        if (homeFeed) {
            setDisplayStyleUsingElementsByClass("ytd-rich-grid-renderer", 'none');
        } else {
            setDisplayStyleUsingElementsByClass("ytd-rich-grid-renderer", '');
        }
    }

    // Left Side Bar
    if (document.getElementById("guide-renderer")) {
        if (leftSidebar) {
            //document.getElementById("guide-renderer").style.display = 'none';
            setDisplayStyleUsingElementById("guide-renderer", 'none');
        } else {
            //document.getElementById("guide-renderer").style.display = '';
            setDisplayStyleUsingElementById("guide-renderer", '');
        }
    }

    //Recommendations
    if (document.getElementById("related")) {
        if (recommendation) {
            //document.getElementById("related").style.display = 'none';
            setDisplayStyleUsingElementById("related", 'none');
        } else {
            //document.getElementById("related").style.display = '';
            setDisplayStyleUsingElementById("related", '');
        }
    }

    //youtube premium banner
    removeElementById("masthead-ad")
    removeElementsByClass("ytd-banner-promo-renderer-inline-image") //redundant
    removeElementsByClass("ytd-banner-promo-renderer") //redundant
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
