function determineAnimation(description) {
  if (description == 'clear sky')
    return "<div class=\"temp-animation icon sunny\"><div class=\"sun\"><div class=\"rays\"></div></div></div>";
  else if (description == 'broken clouds'
    || description == 'scattered clouds'
    || description == 'overcast clouds'
    || description == 'clear sky'
    || description == 'few clouds'
    || description == 'mist') {
    return "<div class=\"temp-animation icon cloudy\"><div class=\"cloud\"></div><div class=\"cloud\"></div></div>";
  }
  else if (description == 'shower rain' || description == 'rain' || description == 'light rain')
    return "<div class=\"temp-animation icon rainy\"><div class=\"cloud\"></div><div class=\"rain\"></div></div>";
  else if (description == 'thunderstorm')
    return "<div class=\"temp-animation icon thunder-storm\"><div class=\"cloud\"></div><div class=\"lightning\"><div class=\"bolt\"></div><div class=\"bolt\"></div></div></div>";
  else if (description == 'snow')
    return "<div class=\"temp-animation icon flurries\"><div class=\"cloud\"></div><div class=\"snow\"><div class=\"flake\"></div><div class=\"flake\"></div></div></div>";
}


$(document).ready(function() {
  $('#weather-data').hide();
  $('#city').on('change', function() {
    var city = $(this).val();
    $('#city-error').html('');
    if (!city) {
      $('#city-error').html('Enter a city please');
      return;
    }
  
    var api = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var apiKey = '&APPID=a714521b6c426be1214c56d56f6bf5c6';
    var apiUnits = '&units=imperial';
    var apiCall = api + apiKey + apiUnits;
  
    var apiFiveDay = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city;
    var apiCallFiveDay = apiFiveDay+ apiKey + apiUnits;
  
    $.getJSON(apiCall, function(json) {
      console.log(JSON.stringify(json));
      console.log(json.main);
  
      $('.currenttemp').html(json.main.temp + '&#8457');
      $('.maxtemp').text(json.main.temp_max);
      $('.mintemp').text(json.main.temp_min);
      $('.location').text(json.name + ', ' + json.sys.country);
      $('.datetime').text(new Date().toLocaleString());
      $('.weather-description').text(json.weather[0].description);
  
      console.log(json.weather[0].description);
      $('.currenttemp-animation').append(determineAnimation(json.weather[0].description));
  
    });
  
    $.getJSON(apiCallFiveDay, function(json) {
      var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (var i = 0; i < 5; i++) {
        var day = json.list[i];
        var output = "\
          <div class=\"col-xs-6 col-sm-2\">\
            <h4>" + days[((new Date()).getDay() + i) % 7] + "</h4>" +
            determineAnimation(day.weather[0].description)
            + "<div>High: " + day.main.temp_max + "&#8457</div>\
                <div>Low: " + day.main.temp_min + "&#8457</div>\
          </div>\
        ";
  
        $('.weekly .row').append(output);
      }
      console.log(json);
    });
  });
});
