document.addEventListener('DOMContentLoaded', function() {

    var zoomButton = document.getElementById('changeZoomButton');
    zoomButton.addEventListener('click', changezoom);
});

function changezoom()
{
  var distance = parseInt(document.getElementById("dist").value);
  var visAc = parseInt(document.getElementById("visAc").value);
  var neededDist = 20*distance/visAc;
  var zoomFactor = distance/neededDist;
  chrome.tabs.getSelected(null, function(tab)
  {
    var tabId = tab.id;
    chrome.tabs.setZoom(tabId, zoomFactor, null);
  })
}
