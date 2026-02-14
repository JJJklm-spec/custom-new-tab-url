document.addEventListener('DOMContentLoaded', function () {
  const loadingElement = document.getElementById('loading');
  const noUrlElement = document.getElementById('no-url');

  // Get the custom URL from storage
  chrome.storage.sync.get(['newTabUrl'], function (result) {
    if (result && result.newTabUrl) {
      // Use tabs API to navigate to the URL (supports edge://, chrome://, file://, etc.)
      chrome.tabs.getCurrent(function(tab) {
        if (tab) {
          chrome.tabs.update(tab.id, { url: result.newTabUrl });
        }
      });
    } else {
      // If no URL is set, show the instructions
      loadingElement.classList.add('hidden');
      noUrlElement.classList.remove('hidden');
    }
  });
});
