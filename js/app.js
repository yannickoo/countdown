$(document).ready(function() {
  var $countdown = $('#countdown'),
      $form = $('form'),
      $end = $form.children('input'),
      currentYear = new Date().getFullYear(),
      message = 'Countdown expired!',
      until,
      date,
      end,
      pad = function(n) {
        return n < 10 ? '0' + n : n;
      },
      iso8601 = function(date) {
        var tzo = -date.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
              var norm = Math.abs(Math.floor(num));
              return (norm < 10 ? '0' : '') + norm;
            };

        return date.getFullYear()
          + '-' + pad(date.getMonth()+1)
          + '-' + pad(date.getDate())
          + 'T' + pad(date.getHours())
          + ':' + pad(date.getMinutes())
          + dif + pad(tzo / 60)
          + ':' + pad(tzo % 60);
      };

  $(window).on('hashchange', function() {
    var hash = decodeURI(location.hash.substr(1));

    if (hash) {
      if (hash.indexOf('|') !== -1) {
        hash = hash.split('|');
        date = hash[0];
        message = hash[1];
      }
      else {
        date = hash;
      }

      until = new Date(Date.parse(date));
    }
    else {
      until = new Date(Date.parse(currentYear + '-05-05T00:00+02:00'));
    }

    end = until.getFullYear() + '-' + pad(until.getMonth() + 1) + '-' + pad(until.getDate()) + 'T' + pad(until.getHours()) + ':' + pad(until.getMinutes());
    $end.val(end);

    $countdown.countdown('destroy').countdown({
      until: until,
      onExpiry: function() {
        setTimeout(function() {
          var title = document.title;
          setInterval(function() {
            if (document.title == title) {
              document.title = message;
            }
            else {
              document.title = title;
            }
          }, 1000);
          $countdown.text(message);
        });
      }
    });
  }).trigger('hashchange');

  $form.on('submit', function(e) {
    var timeVal = $form.find('input[name="time"]').val(),
        time = new Date(timeVal);

    time.setTime(time.getTime() + (time.getTimezoneOffset() * 60 * 1000));
    var date = iso8601(time);

    if (date) {
      location.hash = date;
    }

    e.preventDefault();
  })

  var $body = $('body');
  $(document).keydown(function(e) {
    if (e.keyCode === 78) {
      $body.toggleClass('nerdy');
      e.preventDefault();
    }
    else if (e.keyCode === 83) {
      $body.toggleClass('hide-content');
      e.preventDefault();
    }
  });
});
