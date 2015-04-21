$(document).ready(function() {
  var $countdown = $('#countdown'),
      $form = $('form'),
      $end = $form.children('input'),
      until = new Date(2015, 4, 5),
      message = 'Countdown expired!',
      timestamp,
      end;

  $(window).on('hashchange', function() {
    var hash = location.hash.substr(1);

    if (hash) {
      if (hash.indexOf('|')) {
        hash = hash.split('|');
        timestamp = hash[0];
        message = hash[1];
      }
      else {
        timestamp = hash;
      }

      if (parseInt(timestamp) != timestamp) {
        $countdown.text('o_ô');
        return;
      }

      until = new Date(timestamp * 1000);
      end = until.toISOString().slice(0, 16);

      $end.val(end);
    }

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
    var time = $form.find('input[name="time"]').val(),
        ts = new Date(time).getTime() / 1000;

    if (ts) {
      location.hash = ts;
    }

    e.preventDefault();
  })

  var $body = $('body');
  $(document).keydown(function(e) {
    if (e.keyCode ===	 78) {
      $body.toggleClass('nerdy');
      e.preventDefault();
    }
  });
});
