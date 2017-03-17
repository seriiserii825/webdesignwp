$(function(){
  var jsToggleMenu = $('#js-toggle-menu');
  var jsTopMenu = $('#js-top_menu');

  function heightDetect(){
    $('#js-main-header').css({
      height: $(window).height()
    });  
    $('.section-table').css({
      height: $(window).height()
    });
  }
  heightDetect();
  $(window).resize(function(){
    heightDetect();
  });

  /*togle menu*/
  jsToggleMenu.on('click', function(){
    $('#js-sandwitch').toggleClass('active');
  });

  /*close bg onclick*/ 
  $('.top_menu__list-item').on('click', function(){
    jsTopMenu.fadeOut(200);
    $('#js-sandwitch').toggleClass('active');
  });

  /*show menu*/
  jsToggleMenu.on('click', function(){
    if(jsTopMenu.is(':visible')){
      jsTopMenu.fadeOut(200);
      $('#js-top_menu li a').removeClass('fadeInUp animated');
      $('#js-header-title-wrapper').removeClass('opacity');
    }else{
      jsTopMenu.fadeIn(800);
      $('#js-top_menu li a').addClass('fadeInUp animated');
      $('#js-header-title-wrapper').addClass('opacity');
    }
  });

  /*animation*/
  $('#js-header-title').animated('fadeInDownBig');
  $('#js-header-text').animated('fadeInUpBig');

  /*popup*/
  $('.js-popup').magnificPopup({type: "image"});

  /*change active item of filter*/
  $('#js-filter .js-filter__item').on('click', function(){
    $('#js-filter .js-filter__item').removeClass('active');
    $(this).addClass('active');
  });

  
  /*active mixitup*/
  var mixer = mixitup('#js-grid');

  /*smooth animation potfolio*/
  $('#js-grid .portfolio__img').hover(function(){
    $(this).find('.portfolio__caption').animate({
      opacity: 1,
      paddingTop: 60 + 'px'
    }, 500);
  }, function(){
    $(this).find('.portfolio__caption').animate({
      opacity: 0,
      paddingTop: 0
    }, 100);
  });

  /*add class portfolio__item*/
  $('#js-portfolio .portfolio__item').each(function(i){
      $(this).find('.show-portfolio').attr('href', '#item-' + i);
      $(this).find('.portfolio__work').attr('id', 'item-' + i);
  });

  /*show popup portfolio*/
  $('#js-grid .show-portfolio').magnificPopup({
  type:'inline',
  midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  gallery: {
      enabled: true
    },
  closeBtnInside: true,
  showCloseBtn: true
});

  /*smooth scroll to menu item*/
  $('#js-top_menu .top_menu__list-item').on('click', function(e){
    e.preventDefault();
    var current = $(this).attr('href');
    var currentOffset = $(current).offset().top;

    $('html, body').animate({
      scrollTop: currentOffset
    }, 1000);
  });













  $(window).load(function(){
    $('.loader_inner').fadeOut();
    $('.loader').delay(400).fadeOut('slow');
  });

  
});

