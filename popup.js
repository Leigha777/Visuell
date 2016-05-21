document.addEventListener('DOMContentLoaded', function() {
    var zoomButton = document.getElementById('changeZoomButton');
    zoomButton.addEventListener('click', changezoom);
    restore_zoom();
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
  save_zoom(distance, visAc, neededDist, zoomFactor);
}

function save_zoom(distance, visAc, neededDist, zoomFactor)
{
  chrome.storage.sync.set({
    distance: distance,
    visAc: visAc,
    neededDist: neededDist,
    zoomFactor: zoomFactor
  }, null);
}

function restore_zoom()
{
  chrome.storage.sync.get({
    distance: 1.5,
    visAc: 20,
    needeDist: 1.5,
    zoomFactor: 1
  }, function(items) {
    document.getElementById('dist').value = items.distance;
    document.getElementById('visAc').value = items.visAc;
  })
}
