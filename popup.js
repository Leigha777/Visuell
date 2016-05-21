
document.addEventListener('DOMContentLoaded', function() {
    var zoomButton = document.getElementById('changeZoomButton');
    zoomButton.addEventListener('click', changezoom);
    var metric = false;
    var metricChk = document.getElementById("metricChk");
    metricChk.addEventListener('change', toggleMetric)
    restore_zoom();
});

/*
chrome.tabs.onActivated.addListener(reloadZoom());
chrome.tabs.onUpdated.addListener(reloadZoom());
chrome.tabs.onHighlighted.addListener(reloadZoom());
chrome.tabs.onCreated.addListener(reloadZoom());

function reloadZoom()
{
  restore_zoom();
  changezoom();
}*/

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

function toggleMetric()
{
  var scaleDiv = document.getElementById('scale');
  if(metricChk.checked)
  {
    metric = true;
    scaleDiv.innerHTML ="6/<input id="visAc"></input>";
  }
  else
  {
    metric = false;
    scaleDiv.innerHTML = "20/<input id="visAc"></input>";
  }
}
