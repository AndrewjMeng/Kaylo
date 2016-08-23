let createTable = () => {
  $("<tr id='day'></tr>").appendTo('#currentTable');
  $("<tr id='txtinfo'></tr>").appendTo('#currentTable');
  $("<tr id='imginfo'></tr>").appendTo('#currentTable');    
};



let clearTable = () => {
  $('#currentTable').empty();
};

let clearInputs = () => {
  document.getElementById('city').value='';
  document.getElementById('state').value='';
  document.getElementById('zipcode').value='';
};

let weatherCall = (urls, zipOrCity) => {
    $.ajax({
    url : urls,
    dataType : "json",
    success : url => {
      console.log(url)
      addToDom(url);
      clearInputs();
      }
    });
};

let autoLocation = () => {
  urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast10day/q/autoip.json"
  weatherCall(urls);
};

let startSearch = () => {
  let selectVal = $( "#myselect" ).val();
  let queryCity = document.getElementById('city').value;
  let queryState = document.getElementById('state').value;
  let queryZip = document.getElementById('zipcode').value;
  let urls = '';
  let zipOrCity = false;
  if (!queryZip) {
    urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast10day/q/" + queryState + "/" + queryCity + ".json"
    zipOrCity = true;
  } else {
    urls = "http://api.wunderground.com/api/0c6827c56d281db1/forecast/geolookup/conditions/q/"+ queryZip + queryCity + '/' + queryState + ".json"
  }
  weatherCall(urls, zipOrCity);
};

let addToDom = result => {
  let today;
  let forcastfortheday;
  let date;
  clearTable();
  createTable();
  let info = result.forecast.txt_forecast.forecastday
  console.log(info.length)
  for (let i = 0; i < 8; i+=2) {
    date = info[i].title;
    today =  info[i].icon_url;
    forcastfortheday = info[i].fcttext;
    $('<th>'+ date +'</th>').appendTo('#day');
    $('<th>'+ forcastfortheday +'</th>').appendTo('#txtinfo');
    $('<th><img src='+ today +'></th>').appendTo('#imginfo');
  }    
};

