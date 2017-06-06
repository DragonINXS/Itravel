(function ($) {

// upload 5 photoAddress

$('#trip-photo-input').on('click',()=>{
  $('#trip-photo-input').clone().appendTo(`#formnew`).attr('style', `display:none`);

});

//ends




// flash messages modal
     $("#myModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
         $("#myModal a.btn").on("click", function(e) {
             console.log("button pressed");   // just as an example...
             $("#myModal").modal('hide');     // dismiss the dialog
         });
     });
     $("#myModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
         $("#myModal a.btn").off("click");
     });

     $("#myModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
         $("#myModal").remove();
     });

     $("#myModal").modal({                    // wire up the actual modal functionality and show the dialog
       "backdrop"  : "static",
       "keyboard"  : true,
       "show"      : true                     // ensure the modal is shown immediately
     });
// end of flash messages modal

  $('#submitbut').on('click',()=>{
    if ($('#user-photo-input').val()) {
      console.log('workssss');
      $('#pic').val('true');
      console.log(  $('#pic').val());

    }else if (!$('#user-photo-input').val()){

      $('#pic').val('false');
      console.log(  $('#pic').val());
    }
    $('#edit_form').submit();
  });
    // Init Wow
    wow = new WOW( {
        animateClass: 'animated',
        offset:       100
    });
    wow.init();

    // Navigation scrolls
    $('.navbar-nav li a').bind('click', function(event) {
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var $anchor = $(this);
        var nav = $($anchor.attr('href'));
        if (nav.length) {
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
        }
    });

    // About section scroll
    $(".overlay-detail a").on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function(){
            window.location.hash = hash;
        });
    });

    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar-default").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    // Testimonials Slider
    $('.bxslider').bxSlider({
      adaptiveHeight: true,
      mode: 'fade'
    });

})(jQuery);
