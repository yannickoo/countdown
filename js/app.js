$(document).ready(function() {
  var $countdown = $('#countdown');
  var until = new Date(2014, 4, 7);
  var hash = location.hash.substr(1);
  var timestamp;
  var message = 'Countdown expired!';

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
  }

  $countdown.countdown({
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

  var $body = $('body');
  $(document).keydown(function(e) {
    if (e.keyCode ===	 78) {
      $body.toggleClass('nerdy');
      e.preventDefault();
    }
  });
});
