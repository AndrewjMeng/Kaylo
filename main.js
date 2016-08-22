let weatherCall = function(qUrl) {
    $.ajax({
    url : qUrl,
    dataType : "json",
    success : function(url) {
      addToDom(url);
    }
  })
};

let startSearch = function() {
  let queryCity = document.getElementById('city').value;
  let queryState = document.getElementById('state').value;
  let queryZip = document.getElementById('zipcode').value;
  console.log('hahaha', queryZip)
  let urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/geolookup/conditions/q/"+queryZip+".json"
  let cityUrl = "http://api.wunderground.com/api/0c6827c56d281db1/forecast10day/q/"+queryState+"/"+queryCity+".json"
  weatherCall(urls);
}


let addToDom = function(url) {
      console.log(url)
  let simpleTemp = url.current_observation.display_location.full+ ': '+ url.current_observation.temperature_string;
  let days = url.forecast.txt_forecast.forecastday.length
  // for(var i = 0; i < days; i++) {
  //   console.log('i',i)
  //   let today = url.forecast.txt_forecast.forecastday[i].icon

  //   $('<div>'+simpleTemp+'</div>').appendTo('body');
  //   console.log('ajwiofjaowfoawof',today)
  //   let elem = document.createElement("img");
  //   elem.setAttribute("src", "img/" + today);
  //   document.getElementById("placehere").appendChild(elem);
 //}  
}
