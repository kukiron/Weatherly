/******************************************** Main Function *************************************/
function weather() {
  var message = document.getElementById('message');
  var apiKey = '6d3d994c251342196df6ee1b57f80bc2';
  var url = 'https://api.darksky.net/forecast/';
  var url2 = 'https://maps.googleapis.com/maps/api/geocode/';

  if (!navigator.geolocation) {
    forecast.innerHTML = 'Your browser does not support Geolocation';
  }

  message.classList.add('spinner');

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(latitude, longitude);

    $.getJSON(url + apiKey + '/' + latitude + ',' + longitude, function(data) {

      if (data) message.classList.remove('spinner');

      var temperature = data.currently.temperature;
      var tempF = temperature.toFixed(1);
      var dewTemp = data.currently.dewPoint;
      var dewTempF = dewTemp.toFixed(1);
      var windBearing = data.currently.windBearing + 45;

      // Populating the divs with info
      $('#temp').html('<strong>' + fToC(temperature) + '.</strong>');
      $('#current-summary').html(data.currently.summary);
      $('#hourly-summary').html(data.hourly.summary);
      $('.skycon canvas').addClass(data.currently.icon);

      $('#others_1').html('Humidity: ' + data.currently.humidity * 100 + '%' + '<br><span class="dew-temp">Dew Point: ' + fToC(dewTemp) + '</span>' + '<br>Cloud Cover: ' + data.currently.cloudCover*100 + '%');
      $('#others_2').html('Wind: ' + (data.currently.windSpeed).toFixed(1) + ' mph ' + '&nbsp;&nbsp' + '<span><i class="arrow"></i></span>' + '<br>Pressure: ' + (data.currently.pressure).toFixed(1) + ' mb' + '<br>UV Index: ' + data.currently.uvIndex);
      $('.arrow').css('transform', 'rotate(' + windBearing + 'deg)');

      // Converting units upon click
      $("span.celsius").addClass("active");
      $("span.fahrenheit").on("click", function() {
        $("span.fahrenheit").addClass("active");
        $("span.celsius").removeClass("active");
        $('#temp').html('<strong>' + tempF + '\xB0F.' + '</strong>');
        $('span.dew-temp').html('Dew Point: ' + dewTempF + '\xB0F');
      });
      $("span.celsius").on("click", function() {
        $("span.fahrenheit").removeClass("active");
        $("span.celsius").addClass("active");
        $('#temp').html('<strong>' + fToC(temperature) + '.</strong>');
        $('span.dew-temp').html('Dew Point: ' + fToC(dewTemp));
      });

      // Activate Skycons
      var skyconType = function(icon) {
        if(icon === 'rain') return Skycons.RAIN;
        else if(icon === 'snow') return Skycons.SNOW;
        else if(icon === 'sleet') return Skycons.SLEET;
        else if(icon === 'hail') return Skycons.SLEET;
        else if(icon === 'wind') return Skycons.WIND;
        else if(icon === 'fog') return Skycons.FOG;
        else if(icon === 'cloudy') return Skycons.CLOUDY;
        else if(icon === 'partly-cloudy-day') return Skycons.PARTLY_CLOUDY_DAY;
        else if(icon === 'partly-cloudy-night') return Skycons.PARTLY_CLOUDY_NIGHT;
        else if(icon === 'clear-day') return Skycons.CLEAR_DAY;
        else if(icon === 'clear-night') return Skycons.CLEAR_NIGHT;

        return Skycons.CLOUDY;
      };

      $(function() {
        var skycons = new Skycons({"color": "#444"});
        $('.skycon canvas').each(function(i, elem) {
          skycons.add(elem, skyconType(data.currently.icon));
        });
        skycons.play();
      });

      // Setting the Background Image
      var backgroundImage = chooseImage(data.currently.icon);
      $('#forecast').css('background-image', 'url(' + backgroundImage + ')');

      function chooseImage(icon) {
        if (icon === 'rain') return 'assets/images/background-images/rain.jpg';
        else if (icon === 'snow') return 'assets/images/background-images/snow.jpg';
        else if (icon === 'sleet') return 'assets/images/background-images/sleet.jpg';
        else if (icon === 'hail') return 'assets/images/background-images/hail.jpg';
        else if (icon === 'wind') return 'assets/images/background-images/wind.jpg';
        else if (icon === 'fog') return 'assets/images/background-images/fog.jpg';
        else if (icon === 'cloudy') return 'assets/images/background-images/cloudy.jpg';
        else if (icon === 'partly-cloudy-day') return 'assets/images/background-images/partly-cloudy-day.jpg';
        else if (icon === 'partly-cloudy-night') return 'assets/images/background-images/partly-cloudy-night.jpg';
        else if (icon === 'clear-day') return 'assets/images/background-images/clear-day.jpg';
        else if (icon === 'clear-night') return 'assets/images/background-images/clear-night.jpg';
      }
    });

    $.getJSON(url2 + 'json?latlng=' + latitude + ',' + longitude, function(data) {
      $('#address').html(data.results[0].formatted_address);
    });
  }
  function error() {
    $('#forecast').html('<h4>Your browser doesn\'t support Geolocation</h4>');
  }
}

weather();
setInterval(weather, 120000); // Automatically apdating the weather in every 2 minutes (total 720 API calls a day)

/************************************ Main Function ends here *************************************/


function updateClock() {
  var currentTime = new Date ( );
  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );

  currentHours = (currentHours < 10 ? '0' : '') + currentHours;
  currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;

  var timeOfDay = (currentHours < 12) ? 'AM' : 'PM';

  if (currentHours > 12) {
    if ((currentHours - 12) < 10) currentHours = '0' + (currentHours - 12);
    else if ((currentHours - 12) >= 10) currentHours = (currentHours - 12);
  } else currentHours;

  //currentHours = (currentHours > 12) ? '0' + (currentHours - 12) : currentHours;

  currentHours = (currentHours === 0) ? 12 : currentHours;

  var currentTimeString = currentHours + ":" + currentMinutes;

  document.getElementById("time").innerHTML = currentTimeString;
  document.getElementById("period").innerHTML = timeOfDay;
}

window.setInterval(updateClock, 1000);

function date() {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dates = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var curr_date = new Date().getDate();
  var curr_month = new Date().getMonth();
  var curr_day  = new Date().getDay();

  var day = document.getElementById('day');
  day.innerHTML = (dates[curr_day] + ", " + months[curr_month] + " " + curr_date);
}

date();

function fToC(fahrenheit) {
  var fToCel = (fahrenheit - 32) * 5 / 9;
  var T = fToCel.toFixed(1) + '\xB0C';
  return T;
}
