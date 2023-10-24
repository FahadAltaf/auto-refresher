chrome.storage.local.get(['minInterval', 'maxInterval', 'selectors', 'enabled'], function(items) {
    console.log('get settings');
    if (!items.enabled) {
        return;
    }

    function getRandomInt(min, max) {
        var intervel = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('Interval: '+intervel);
        return 
    }

    var refreshInterval = getRandomInt(parseInt(items.minInterval), parseInt(items.maxInterval)) * 1000;
    setTimeout(function() {
        console.log('refreshing');
        var selectors = items.selectors;
        if(selectors.length > 0) {
            var randomSelector = selectors[Math.floor(Math.random() * selectors.length)];
            var element = document.querySelector(randomSelector);
            if(element) {
                element.click();
            } else {
                location.reload();
            }
        } else {
            location.reload();
        }
    }, refreshInterval);
});
