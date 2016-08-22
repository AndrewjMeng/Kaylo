var weatherCall = function(urls) {
    $.ajax({
    url : urls,
    dataType : "json",
    success : function(url) {
      addToDom(url);
      }
    });
  };
  var startSearch = function() {
  var queryCity = document.getElementById('city').value;
  var queryState = document.getElementById('state').value;
  var queryZip = document.getElementById('zipcode').value;
  var urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/geolookup/conditions/q/"+queryZip+queryCity+'/'+queryState+".json"
  weatherCall(urls);
}

var addToDom = function(result) {
  var simpleTemp = result.current_observation.display_location.full+ result.current_observation.temperature_string;
  var today = result.forecast.txt_forecast.forecastday[0].icon_url
  $('<div>'+simpleTemp+'</div>').appendTo('body');
  console.log(today)
  var elem = document.createElement("img");
  elem.setAttribute("src", today);
  document.getElementById("placehere").appendChild(elem);

}