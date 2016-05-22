
document.addEventListener('DOMContentLoaded', function() {
    var zoomButton = document.getElementById('changeZoomButton');
    zoomButton.addEventListener('click', changezoomclick);
    var metric = false;
    var metricChk = document.getElementById("metricChk");
    metricChk.addEventListener('change', toggleMetric);
    restore_zoom();

    document.getElementById('snellen20200').addEventListener('click', function() {
      changezoom(2, 200)
    });
    document.getElementById('snellen20100').addEventListener('click', function() {
      changezoom(2, 100)
    });
    document.getElementById('snellen2070').addEventListener('click', function() {
      changezoom(2, 70)
    });
    document.getElementById('snellen2050').addEventListener('click', function() {
      changezoom(2, 50)
    });
    document.getElementById('snellen2040').addEventListener('click', function() {
      changezoom(2, 40)
    });
    document.getElementById('snellen2030').addEventListener('click', function() {
      changezoom(2, 30)
    });
    document.getElementById('snellen2025').addEventListener('click', function() {
      changezoom(2, 25)
    });;
    document.getElementById('snellen2020').addEventListener('click', function() {
      changezoom(2, 20)
    });
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

function changezoomclick()
{
    var distance = parseFloat(document.getElementById("dist").value);
    var visAc = parseFloat(document.getElementById("visAc").value);
    changezoom(distance, visAc);
}

function changezoom(distance, visAc)
{
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
    distance: 2,
    visAc: 20,
    needeDist: 2,
    zoomFactor: 1
  }, function(items) {
    document.getElementById('dist').value = items.distance;
    document.getElementById('visAc').value = items.visAc;
  })
}

function toggleMetric()
{
  save_zoom();
  var scaleDiv = document.getElementById('scale');
  if(metricChk.checked)
  {
    metric = true;
    scaleDiv.innerHTML ="6/<input id=\"visAc\"></input>";
  }
  else
  {
    metric = false;
    scaleDiv.innerHTML = "20/<input id=\"visAc\"></input>";
  }
  restore_zoom();
}
