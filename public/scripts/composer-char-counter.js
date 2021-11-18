const countNumber = 140;
function updateCounter() {
  const counter = $("#tweet-text").val().length;
  $('.counter').text(countNumber - counter);
  if ($('.counter').text() < 0) {
    $('.counter').addClass('overflow');
  } else {
    return $('.counter').removeClass('overflow');
  }
}

$(document).ready(function () {
  $("#tweet-text").on('input', updateCounter);
});
