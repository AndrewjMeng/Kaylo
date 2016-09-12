let clearInputs = () => {
  document.getElementById('city').value='';
  document.getElementById('state').value='';
  document.getElementById('zipcode').value='';
};

let weatherCall = (urls) => {
  $.ajax({
    url : urls,
    dataType : "json",
    success : url => {
      console.log('weathercall',url);
      addToDom(url);
      queTable(url);
      clearInputs();
    }
  });
};

let createToday = () => {
  $("<tr id='days'></tr>").appendTo('#tableWeather');
  $("<tr id='time'></tr>").appendTo('#tableWeather');
  $("<tr id='txtinfos'></tr>").appendTo('#tableWeather');
  $("<tr id='imginfos'></tr>").appendTo('#tableWeather');
  $("<tr id='img'></tr>").appendTo('#tableWeather');
  $("<tr id='pop12'></tr>").appendTo('#tableWeather');  
  $("<tr id='imgdis'></tr>").appendTo('#tableWeather');
  $("<tr id='radar3'></tr>").appendTo('#tableWeather');   
};

let autoDesplay = url => {
  createToday();
  let info = url.current_observation;
  pop1 = url.forecast.simpleforecast.forecastday[0].pop;
  radar4 = url.satellite.image_url_ir4;
  $('<th>'+'Location: ' + info.observation_location.full+'</th>').appendTo('#days');
  $('<th>'+ info.observation_time+'</th>' ).appendTo('#time');
  $('<th>'+  'Temperature: ' + info.temp_f +' F </th>').appendTo('#txtinfos');
  $('<th>'+ 'Wind: ' + info.wind_string +'</th>').appendTo('#imginfos');
  $('<th><img src='+ info.icon_url +'></th>').appendTo('#img');
  $('<th>' + pop1 +' % precipitation</th>').appendTo('#pop12');
  $('<th>'+ 'Weather: ' + info.weather +'</th>').appendTo('#imgdis');
  $('<th><img src='+ radar4 +'></th>').appendTo('#radar3');
  backgroundPicker(info.icon);
};

let autoLocation = () => {
  urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/conditions/satellite/q/autoip.json";
   $.ajax({
    url : urls,
    dataType : "json",
    success : url => {
      console.log('auto',url);
      autoDesplay(url);
    }
  });
};

let startSearch = () => {
  let queryCity = document.getElementById('city').value;
  let queryState = document.getElementById('state').value;
  let queryZip = document.getElementById('zipcode').value;
  if (!queryZip) {
    urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/satellite/conditions/q/"+ queryZip + queryState + "/" + queryCity + ".json";
  } else {
    urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/conditions/satellite/q/"+ queryZip + ".json";
  }
  weatherCall(urls);
};

let backgroundPicker = (backg) => {
  $('body').css('background-image', "url(img/"+backg+".jpeg)");
};


let addToDom = result => {
  clearTable();
  createTable(result);
  let info = result.forecast.simpleforecast.forecastday;
  for (let i = 0; i < info.length; i++) {
    date = info[i].date.weekday;
    today =  info[i].icon_url;
    high = info[i].high.fahrenheit;
    low = info[i].low.fahrenheit;
    rain = info[i].pop;
    condition = info[i].conditions;
    $('<th>'+ date +'</th>').appendTo('#day');
    $('<th>'+ condition +'</th>').appendTo('#condit');
    $('<th>'+rain+' % precipitation</th>').appendTo('#raining');
    $('<th>'+ 'High: '+high + 'F Low: '+low+' F</th>').appendTo('#txtinfo');
    $('<th><img src='+ today +'></th>').appendTo('#imginfo');
  }
  backgroundPicker(info[0].icon);
};

let createTable = (result) => {
  city = result.current_observation.observation_location;
  $("<caption>Queried Location: "+city.city+" "+city.state+"</cation>").appendTo("#currentTable");
  $("<tr id='day'></tr>").appendTo('#currentTable');
  $("<tr id='condit'></tr>").appendTo('#currentTable');
  $("<tr id='raining'></tr>").appendTo('#currentTable');
  $("<tr id='txtinfo'></tr>").appendTo('#currentTable');
  $("<tr id='imginfo'></tr>").appendTo('#currentTable');    
};

let clearTable = () => {
  $('#currentTable').empty();
};

let createQueried = () => {
  $("<caption>Current Weather at Queried Location</cation>").appendTo("#queriedTable");
  $("<tr id='da'></tr>").appendTo('#queriedTable');
  $("<tr id='tim'></tr>").appendTo('#queriedTable');
  $("<tr id='txtin'></tr>").appendTo('#queriedTable');
  $("<tr id='imgi'></tr>").appendTo('#queriedTable');
  $("<tr id='im'></tr>").appendTo('#queriedTable');
  $("<tr id='pop123'></tr>").appendTo('#queriedTable');
  $("<tr id='imgdi'></tr>").appendTo('#queriedTable');
  $("<tr id='radar1'></tr>").appendTo('#queriedTable');  
};

let queTable = url => {
  console.log('quie', url);
  clearQue();
  createQueried();
  let info = url.current_observation
  pop1 = url.forecast.simpleforecast.forecastday[0].pop
  radar = url.satellite.image_url_ir4
  $('<th>'+'Location: ' + info.observation_location.full+'</th>').appendTo('#da');
  $('<th>'+ info.observation_time+'</th>' ).appendTo('#tim')
  $('<th>'+  'Temperature: ' + info.temp_f +' F </th>').appendTo('#txtin');
  $('<th>'+ 'Wind: ' + info.wind_string +'</th>').appendTo('#imgi');
  $('<th><img src='+ info.icon_url +'></th>').appendTo('#im');
  $('<th>' + pop1 +' % precipitation</th>').appendTo('#pop123');
  $('<th>'+ 'Weather: ' + info.weather +'</th>').appendTo('#imgdi');
  $('<th><img src='+ radar +'></th>').appendTo('#radar1');
  backgroundPicker(info.icon)  
};

let clearQue = () => {
  $('#queriedTable').empty();
};