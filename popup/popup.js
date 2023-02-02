chrome.storage.sync.get(['block_comments', 'left_side_bar', 'recommendations', 'home_feed', 'shorts'], function (obj) {
    document.getElementById('block_comments_cb').checked = obj.block_comments == undefined ? true : obj.block_comments;
    document.getElementById('left_side_bar_cb').checked = obj.left_side_bar == undefined ? true : obj.left_side_bar;
    document.getElementById('recommendations_cb').checked = obj.recommendations == undefined ? true : obj.recommendations;
    document.getElementById('home_feed_cb').checked = obj.home_feed == undefined ? true : obj.home_feed;
    document.getElementById('shorts_cb').checked = obj.shorts == undefined ? true : obj.shorts;
});

document.addEventListener('DOMContentLoaded', function () {
    var blockCommentsCheckBox = document.getElementById('block_comments_cb');
    blockCommentsCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            block_comments: getNoneOrEmptyBasedOnChecked(blockCommentsCheckBox.checked)
        });
    }, false);

    var leftSideBarCheckBox = document.getElementById('left_side_bar_cb');
    leftSideBarCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            left_side_bar: getNoneOrEmptyBasedOnChecked(leftSideBarCheckBox.checked)
        });
    }, false);

    var recommendationsCheckBox = document.getElementById('recommendations_cb');
    recommendationsCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            recommendations: getNoneOrEmptyBasedOnChecked(recommendationsCheckBox.checked)
        });
    }, false);

    var homeFeedCheckBox = document.getElementById('home_feed_cb');
    homeFeedCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            home_feed: getNoneOrEmptyBasedOnChecked(homeFeedCheckBox.checked)
        });
    }, false);

    var shortsCheckBox = document.getElementById('shorts_cb');
    shortsCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            shorts: getNoneOrEmptyBasedOnChecked(shortsCheckBox.checked)
        });
    }, false);
    
}, false);


function getNoneOrEmptyBasedOnChecked(checked) {
    if (checked) {
        return 'none'
    } 
    return '';
}