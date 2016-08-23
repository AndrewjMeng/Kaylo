var weatherCall = function(urls, zipOrCity) {
    $.ajax({
    url : urls,
    dataType : "json",
    success : function(url) {
      console.log(url)
      addToDom(url);
      }
    });
  };
  var startSearch = function() {
  var queryCity = document.getElementById('city').value;
  var queryState = document.getElementById('state').value;
  var queryZip = document.getElementById('zipcode').value;
  var urls = '';
  var zipOrCity = false;
  if (!queryZip) {
    urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast10day/q/" + queryState + "/" + queryCity + ".json"
    zipOrCity = true;
  } else {
    urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/geolookup/conditions/q/"+ queryZip + queryCity + '/' + queryState + ".json"
  }
  weatherCall(urls, zipOrCity);
};

var addToDom = function(result) {
  var today;
  var forcastfortheday;
  var info = result.forecast.txt_forecast.forecastday
  for (var i = 0; i < 8; i+=2) {
    date = info[i].title;
    today =  info[i].icon_url;
    forcastfortheday = info[i].fcttext;
    $('<th>'+ date +'</th>').appendTo('#day');
    $('<th>'+ forcastfortheday +'</th>').appendTo('#txtinfo');
    $('<th><img src='+ today +'></th>').appendTo('#imginfo');
  }    
};
