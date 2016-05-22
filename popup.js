
var metric = false;

document.addEventListener('DOMContentLoaded', function() {

  restore_zoom();

  var radios = document.getElementsByName('zoomopt');
  for(var i = 0, max = radios.length; i < max; i++) {
      radios[i].addEventListener('click', changeopt);
  }

  document.getElementById('changeZoomButton').addEventListener('click', changezoomclick);
  document.getElementById("metricChk").addEventListener('change', toggleMetric);

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

  document.getElementById('dioptriczoombutton').addEventListener('click', dioptriczoomclick);
});

/* TODO Figure out how to persist across tabs and stuff*/

function changezoomclick()
{
  var distance = parseFloat(document.getElementById("dist").value);
  var visAc = parseFloat(document.getElementById("visAc").value);
  changezoom(distance, visAc);
}

function changezoom(distance, visAc)
{
  var base = 20;
  if(metric)
  {
    base = 6;
  }

  var neededDist = base*distance/visAc;
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

function dioptriczoomclick()
{
  document.getElementById('dioptricopts').style.display='block';

  var dods = parseFloat(document.getElementById('dods').value);
  var doss = parseFloat(document.getElementById('doss').value);
  var aods = parseFloat(document.getElementById('aods').value);
  var aoss = parseFloat(document.getElementById('aoss').value);
  var ods = dods + aods;
  var oss = doss + aoss;
  var sph = (ods + oss)/2;

  if(sph >= -0.5)
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 20);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 30);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 40);
    });
  }
  else if(sph >= -0.75)
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 40);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 50);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 60);
    });
  }
  else if(sph >= -1.0)
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 50);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 60);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 70);
    });
  }
  else if(sph >= -1.25)
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 60);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 70);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 80);
    });
  }
  else if(sph >= -1.50)
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 80);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 90);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 100);
    });
  }
  else if(sph >= -2.5)
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 100);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 150);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 200);
    });
  }
  else
  {
    document.getElementById('opt1').addEventListener('click', function() {
      changezoom(2, 10);
    });
    document.getElementById('opt2').addEventListener('click', function() {
      changezoom(2, 20);
    });
    document.getElementById('opt3').addEventListener('click', function() {
      changezoom(2, 30);
    });
  }
}

function changeopt()
{
  var radios = document.getElementsByName('zoomopt');
  var i = radios.length;
  for(var j = 0; j < i; j++) {
    if(radios[j].checked)
    {
      switch(j)
      {
        case 0:
          document.getElementById('manual').style.display='block';
          document.getElementById('snellenpick').style.display='none';
          document.getElementById('diopters').style.display='none';
          break;
        case 1:
          document.getElementById('manual').style.display='none';
          document.getElementById('snellenpick').style.display='block';
          document.getElementById('diopters').style.display='none';
          break;
        case 2:
          document.getElementById('manual').style.display='none';
          document.getElementById('snellenpick').style.display='none';
          document.getElementById('diopters').style.display='block';
          break;
      }
    }
  }
  document.getElementById('dioptricopts').style.display='none';
}
