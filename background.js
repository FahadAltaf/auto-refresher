// background.js
chrome.runtime.onInstalled.addListener(() => {
    // Set default settings
    chrome.storage.local.set({
        minInterval: 5,
        maxInterval: 30,
        selectors: [],
        enabled: false
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggle') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: {tabId: activeTab.id},
                func: toggle,
                args: [message.enabled]
            });
        });
    }
});

function toggle(enabled) {
    if (enabled) {
        start();
    } else {
        stop();
    }
}

function start() {
    // ... rest of your start function code ...
    console.log('Starting...');
}

function stop() {
    // ... rest of your stop function code ...
    console.log('Stopping...');
}
