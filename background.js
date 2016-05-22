chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({popup:'popup.html'});
  var viewTabUrl = chrome.extension.getURL('popup.html');

  // Get view and set the stuff
  var view = chrome.extension.getViews()[0];
  //view.restoreZoomFromBackground();
})

chrome.tabs.onActivated.addListener(function(tab) {
  // Get view and set the stuff
  var view = chrome.extension.getViews()[0];
  //view.restoreZoomFromBackground();
})
