document.addEventListener('DOMContentLoaded', function() {

    var zoomButton = document.getElementById('changeZoomButton');
    zoomButton.addEventListener('click', changezoom);
});

function changezoom()
{
  var distance = parseFloat(document.getElementById("dist").value);
  var visAc = parseFloat(document.getElementById("visAc").value);
  var neededDist = 20*distance/visAc;
  var zoomFactor = distance/neededDist;
  chrome.tabs.getSelected(null, function(tab)
  {
    var tabId = tab.id;
    chrome.tabs.setZoom(tabId, zoomFactor, null);
  })
}
