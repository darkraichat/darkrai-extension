// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function() {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    let nickname;

    chrome.storage.local.get(['nickname'], function(result) {
      nickname = result.nickname;
      chrome.tabs.sendMessage(activeTab.id, {
        message: 'clicked_browser_action',
        nickname,
      });
    });
  });
});
