/** global: Skycons */

/**
 * Helper functions for Weatherly Extension
 *
 */
(function() {
  'use strict';

  var Weatherly = {
    /** Set icon for weather condition **/
    skycon_type: function(icon) {
      if (icon === 'rain') {
        return Skycons.RAIN;
      } else if (icon === 'snow') {
        return Skycons.SNOW;
      } else if (icon === 'sleet') {
        return Skycons.SLEET;
      } else if (icon === 'hail') {
        return Skycons.SLEET;
      } else if (icon === 'wind') {
        return Skycons.WIND;
      } else if (icon === 'fog') {
        return Skycons.FOG;
      } else if (icon === 'cloudy') {
        return Skycons.CLOUDY;
      } else if (icon === 'partly-cloudy-day') {
        return Skycons.PARTLY_CLOUDY_DAY;
      } else if (icon === 'partly-cloudy-night') {
        return Skycons.PARTLY_CLOUDY_NIGHT;
      } else if (icon === 'clear-day') {
        return Skycons.CLEAR_DAY;
      } else if (icon === 'clear-night') {
        return Skycons.CLEAR_NIGHT;
      }
      return Skycons.CLOUDY;
    },

    /** Set background image **/
    choose_image: function(icon) {
      if (icon === 'rain') {
        return 'assets/images/background-images/rain.jpg';
      } else if (icon === 'snow') {
        return 'assets/images/background-images/snow.jpg';
      } else if (icon === 'sleet') {
        return 'assets/images/background-images/sleet.jpg';
      } else if (icon === 'hail') {
        return 'assets/images/background-images/hail.jpg';
      } else if (icon === 'wind') {
        return 'assets/images/background-images/wind.jpg';
      } else if (icon === 'fog') {
        return 'assets/images/background-images/fog.jpg';
      } else if (icon === 'cloudy') {
        return 'assets/images/background-images/cloudy.jpg';
      } else if (icon === 'partly-cloudy-day') {
        return 'assets/images/background-images/partly-cloudy-day.jpg';
      } else if (icon === 'partly-cloudy-night') {
        return 'assets/images/background-images/partly-cloudy-night.jpg';
      } else if (icon === 'clear-day') {
        return 'assets/images/background-images/clear-day.jpg';
      } else if (icon === 'clear-night') {
        return 'assets/images/background-images/clear-night.jpg';
      }
      return 'assets/images/background-images/cloudy.jpg';
    },

    /** Set clock showing current time **/
    update_clock: function() {
      var timeOfDay, currentTimeString;
      var currentTime = new Date(),
          currentHours = currentTime.getHours(),
          currentMinutes = currentTime.getMinutes();

      currentHours = (currentHours < 10 ? '0' : '') + currentHours;
      currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;
      timeOfDay = (currentHours < 12) ? 'AM' : 'PM';

      if (currentHours > 12) {
        if ((currentHours - 12) < 10) currentHours = '0' + (currentHours - 12);
        else if ((currentHours - 12) >= 10) currentHours = (currentHours - 12);
      } else currentHours;

      currentHours = (currentHours === 0) ? 12 : currentHours;
      currentTimeString = currentHours + ':' + currentMinutes;

      $('#time').html(currentTimeString);
      $('#period').html(timeOfDay);
    },

    /** Set date, month & day **/
    update_date: (function() {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          dates = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var current_date = new Date().getDate(),
          current_month = new Date().getMonth(),
          current_day  = new Date().getDay();

      $('#day').html(dates[current_day] + ', ' + months[current_month] + ' ' + current_date);
    })(),

    /** Page slider for weather map **/
    page_slider: (function() {
      var leftMargin, newLeftMargin;
      $('.nextBtn').click(function() { goRight() });
      $('.backBtn').click(function() { goLeft() });

      // inner section slides left
      function goRight() {
        leftMargin = $('.inner-liner').css('margin-left').replace('px', '') * 1;
        newLeftMargin = (leftMargin - 650);
        $('.inner-liner').animate({ marginLeft: newLeftMargin }, 500);
      }
      // inner section slides right
      function goLeft() {
        leftMargin = $('.inner-liner').css('margin-left').replace('px', '') * 1;
        newLeftMargin = (leftMargin + 650);
        $('.inner-liner').animate({ marginLeft: newLeftMargin }, 500);
      }
    })(),

    /** Convert temperature unit **/
    fToC: function(fahrenheit) {
      var celcius = (fahrenheit - 32) * 5 / 9;
      return celcius.toFixed(1);
    }
  };

  // Update current time
  window.setInterval(Weatherly.update_clock, 1000);
  window.Weatherly = Weatherly;
})();
