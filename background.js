chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({popup:'popup.html'});
  var viewTabUrl = chrome.extension.getURL('popup.html');

  // Get view and set the stuff
  var view = chrome.extension.getViews()[0];
  //view.restoreZoomFromBackground();
})

var zoomFactors = 1;
var enabled = false;

chrome.tabs.onActivated.addListener(function(tab) {
  restore_zoom();
  changezoom(zoomFactors);
});

chrome.tabs.onUpdated.addListener(function(tab) {
  restore_zoom();
  changezoom(zoomFactors);
});

chrome.tabs.onCreated.addListener(function(tab) {
  restore_zoom();
  changezoom(zoomFactors);
});

function changezoom(zoomFactor)
{
  chrome.tabs.query(
    {active: true}, function(tabarray)
  {
    if(enabled)
    {
      chrome.tabs.setZoom(tabarray[0].id, zoomFactor, null);
    }
    else {
      chrome.tabs.setZoom(tabarray[0].id, 0, null);
    }
  })
}

// Restore zoom data after opening
function restore_zoom()
{
  chrome.storage.sync.get({
    distance: 2,
    visAc: 20,
    needeDist: 2,
    zoomFactor: 1,
    metric: false,
    enabled: false
  }, function(items) {
    zoomFactors = items.zoomFactor;
    enabled = items.enabled;
  })
}
