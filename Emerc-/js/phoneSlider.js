var $slider = $('.slider');

var $slickTrack = $('.slick-track');
var $slickCurrent = $('.slick-current');

var slideDuration = 900;

//RESET ANIMATIONS
// On init slide change
$slider.on('init', function(slick){
  TweenMax.to($('.slick-track'), 0.9, {
    marginLeft: 0
  });
  TweenMax.to($('.slick-active'), 0.9, {
    x: 0,
    zIndex: 2
  });
});
// On before slide change
$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
  TweenMax.to($('.slick-track'), 0.9, {
    marginLeft: 0
  });
  TweenMax.to($('.slick-active'), 0.9, {
    x: 0
  });
});

// On after slide change
$slider.on('afterChange', function(event, slick, currentSlide){
  TweenMax.to($('.slick-track'), 0.9, {
    marginLeft: 0
  });
  $('.slick-slide').css('z-index','1');
  TweenMax.to($('.slick-active'), 0.9, {
    x: 0,
    zIndex: 2
  });
});

//SLICK INIT
$slider.slick({
  speed: slideDuration,
  dots: true,
  waitForAnimate: true,
  useTransform: true,
  cssEase: 'cubic-bezier(0.455, 0.030, 0.130, 1.000)'
})
