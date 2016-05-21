document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('status').textContent = "Testing";
    var zoomButton = document.getElementById('changeZoomButton');
    zoomButton.addEventListener('click', changezoom);
});

function changezoom()
{
  console.log("Clicked!!!!!");
  chrome.tabs.getSelected(null, function(tab)
  {
    var tabId = tab.id;
    chrome.tabs.setZoom(tabId, 0.55, null);
  })
}
