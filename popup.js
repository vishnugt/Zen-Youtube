chrome.storage.sync.get(['block_comments', 'left_side_bar', 'recommendations', 'home_feed'], function (obj) {
    document.getElementById('block_comments_cb').checked = obj.block_comments;
    document.getElementById('left_side_bar_cb').checked = obj.left_side_bar;
    document.getElementById('recommendations_cb').checked = obj.recommendations;
    document.getElementById('home_feed_cb').checked = obj.home_feed;
});

document.addEventListener('DOMContentLoaded', function () {
    var blockCommentsCheckBox = document.getElementById('block_comments_cb');
    blockCommentsCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            block_comments: blockCommentsCheckBox.checked
        });
    }, false);

    var leftSideBarCheckBox = document.getElementById('left_side_bar_cb');
    leftSideBarCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            left_side_bar: leftSideBarCheckBox.checked
        });
    }, false);

    var recommendationsCheckBox = document.getElementById('recommendations_cb');
    recommendationsCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            recommendations: recommendationsCheckBox.checked
        });
    }, false);

    var homeFeedCheckBox = document.getElementById('home_feed_cb');
    homeFeedCheckBox.addEventListener('change', function () {
        chrome.storage.sync.set({
            home_feed: homeFeedCheckBox.checked
        });
    }, false);
}, false);