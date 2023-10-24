function loadSettings() {
    chrome.storage.local.get(['minInterval', 'maxInterval', 'selectors', 'enabled'], function(items) {
        if(items.minInterval) {
            document.getElementById('minInterval').value = items.minInterval;
        }
        if(items.maxInterval) {
            document.getElementById('maxInterval').value = items.maxInterval;
        }
        if(items.selectors) {
            document.getElementById('selectors').value = items.selectors.join('\n');
        }
        document.getElementById('toggle').innerText = items.enabled ? 'Toggle Off' : 'Toggle On';
    });
}

document.getElementById('save').onclick = function() {
    var minInterval = document.getElementById('minInterval').value;
    var maxInterval = document.getElementById('maxInterval').value;
    var selectors = document.getElementById('selectors').value.split('\n');
    chrome.storage.local.set({
        minInterval: minInterval,
        maxInterval: maxInterval,
        selectors: selectors
    }, function() {
        // Optionally notify the user that the settings have been saved.
        alert('Settings saved.');
    });
};

document.getElementById('toggle').onclick = function() {
    chrome.storage.local.get(['enabled'], function(items) {
        var enabled = !items.enabled;
        chrome.storage.local.set({enabled: enabled}, function() {
            document.getElementById('toggle').innerText = enabled ? 'Toggle Off' : 'Toggle On';
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.runtime.sendMessage({action: 'toggle', enabled: enabled});
            });
        });
    });
};

// Load the saved settings whenever the popup is opened.
loadSettings();
