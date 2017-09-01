/**
 * Main function - Uses DarkSky API for weather details
 *
 */
(function() {
  'use strict'

  var API_KEY = '6d3d994c251342196df6ee1b57f80bc2',
      GEOLOCATION_URL = 'https://maps.googleapis.com/maps/api/geocode/',
      WEATHER_URL = 'https://api.darksky.net/forecast/';
  var LAT, LNG,
      BASE_URL,
      PARAMETERS,
      MAP_URL;

  // Loading spinner
  $('.wrapper').addClass('spinner');

  navigator.geolocation.getCurrentPosition(function(position) {
    LAT = position.coords.latitude;
    LNG = position.coords.longitude;

    $.getJSON(GEOLOCATION_URL + 'json?latlng=' + LAT + ',' + LNG, function(response) {
      $('#address').html(response.results[1].formatted_address);
      // Set the browser action's title
      chrome.browserAction.setTitle({ title: 'Weatherly@' + response.results[3].formatted_address });
    });

    $.getJSON(WEATHER_URL + API_KEY + '/' + LAT + ',' + LNG, function(data) {
      // Removing spinner upon data load
      if (data) $('.wrapper').removeClass('spinner');

      var temperature = data.currently.temperature,
          current_summary = data.currently.summary,
          hourly_summary = data.hourly.summary,
          icon = data.currently.icon,
          tempF = temperature.toFixed(1),
          tempC = Weatherly.fToC(temperature),
          dewTemp = data.currently.dewPoint,
          dewTempF = dewTemp.toFixed(1),
          dewTempC = Weatherly.fToC(dewTemp),
          humidity = data.currently.humidity * 100,
          cloudCover = Math.round(data.currently.cloudCover * 100),
          windSpeed = (data.currently.windSpeed).toFixed(1),
          windBearing = data.currently.windBearing + 45,
          pressure = (data.currently.pressure).toFixed(1),
          uvIndex = data.currently.uvIndex;

      // Populate divs with weather details
      $('#temp').html('<strong>' + tempC + '\xB0C' + '.</strong>');
      $('#current-summary').html(current_summary);
      $('.skycon canvas').addClass(icon);

      $('#hourly-summary').html(hourly_summary);
      $('#info_1').html(
                    'Humidity: ' + humidity + '%' + '<br>'
                  + '<span class="dew-temp">Dew Point: ' + dewTempC + '\xB0C' + '</span>' + '<br>'
                  + 'Cloud Cover: ' + cloudCover + '%');
      $('#info_2').html(
                    'Wind: ' + windSpeed + ' mph ' + '&nbsp;&nbsp' + '<span><i class="arrow"></i></span>' + '<br>'
                  + 'Pressure: ' + pressure + ' mb' + '<br>'
                  + 'UV Index: ' + uvIndex);
      $('.arrow').css('transform', 'rotate(' + windBearing + 'deg)');

      // Set badge text & color for current temperature
      chrome.browserAction.setBadgeText({ text: tempC });
      chrome.browserAction.setBadgeBackgroundColor({ color: '#2C3C60' });

      $('span.celsius').addClass("active");
      // Convert units upon clicking
      $('span.fahrenheit').on('click', function() {
        $('span.celsius').removeClass('active');
        $('span.fahrenheit').addClass('active');
        $('#temp').html('<strong>' + tempF + '\xB0F.' + '</strong>');
        $('span.dew-temp').html('Dew Point: ' + dewTempF + '\xB0F');
        chrome.browserAction.setBadgeText({ text: tempF });
      });
      $('span.celsius').on('click', function() {
        $('span.fahrenheit').removeClass('active');
        $('span.celsius').addClass('active');
        $('#temp').html('<strong>' + tempC + '\xB0C' + '.</strong>');
        $('span.dew-temp').html('Dew Point: ' + dewTempC + '\xB0C');
        chrome.browserAction.setBadgeText({ text: tempC });
      });

      // Activate Skycons
      $(function() {
        var skycons = new Skycons({ 'color': '#444' });
        $('.skycon canvas').each(function(i, elem) {
          skycons.add(elem, Weatherly.skycon_type(icon));
        });
        skycons.play();
      });

      // Setting the Background Image
      var backgroundImage = Weatherly.choose_image(icon);
      $('#forecast').css('background-image', 'url(' + backgroundImage + ')');
    });

    /** Dark Sky Weather Map **/
    BASE_URL = 'https://maps.darksky.net/@temperature,' + LAT + ',' + LNG ;
    PARAMETERS = 'embed=true&timeControl=false&fieldControl=true&defaultField=temperature&defaultUnits=_c';
    MAP_URL = BASE_URL + ',8?' + PARAMETERS;

    $('iframe').attr('src', MAP_URL);
  },
  function error() {
    // Show error message if failed to load data
    $('.wrapper').removeClass('spinner');
    $('.wrapper').addClass('error');
  });
})();
