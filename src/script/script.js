$(document).ready(function () {
    $('.sidenav').sidenav();
    $('ul.tabs').tabs();
});

var current_star_statusses = [];

star_elements = $('.fa-star').parent();

star_elements.find(".fa-star").each(function(i, elem) {
  current_star_statusses.push($(elem).hasClass('blanco'));
});

star_elements.find(".fa-star").mouseenter(changeRatingStars);
star_elements.find(".fa-star").mouseleave(resetRatingStars);

/**
 * Changes the rating star colors when hovering over it.
 */
function changeRatingStars() {
  // Current star hovered
  var star = $(this);

  // Removes all colors first from all stars
  $('.fa-star').removeClass('gray').removeClass('blanco');

  // Makes the current hovered star yellow
  star.addClass('blanco');

  // Makes the previous stars yellow and the next stars gray
  star.parent().prevAll().children('.fa-star').addClass('blanco');
  star.parent().nextAll().children('.fa-star').addClass('gray');
}

/**
 * Resets the rating star colors when not hovered anymore.
 */
function resetRatingStars() {
  star_elements.each(function(i, elem) {
    $(elem).removeClass('blanco').removeClass('gray').addClass(current_star_statusses[i] ? 'blanco' : 'gray');
  });
}