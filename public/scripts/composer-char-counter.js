$(document).ready(function() {

  $("#tweet-text").on('keyup', function(event) {
    let count = $(this).val();
    let remaining = 140 - count.length;
    
    const $characterCounter = $(this).siblings("div").find(".counter");
    if (remaining <= 0){
      $characterCounter.addClass('red');
    } else {
      $characterCounter.removeClass('red');
    }
    $characterCounter.html(remaining);
  });
});