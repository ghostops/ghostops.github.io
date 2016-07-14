document.addEventListener("DOMContentLoaded", function() {
  var lastElementClicked;

  Barba.Pjax.init();
  Barba.Prefetch.init();

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function() {
      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      $("html, body").animate({ scrollTop: 0 }, 200);

      $el.animate({ opacity: 1 }, 200, function() {
        _this.done();
      });
    }
  });

  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };
});

function easterEgg() {
  if( confirm("\\^_^/ Yay!") ) {
    window.location = "http://whatareyoudoinginmyswamp.com";
  }
  else {
    console.log("You are missing out.")
  }
}

$(document).ready(function() {
  if(typeof(isFrontpage) !== 'undefined') {
    var once = 0;
    $("#mainNav a").click(function() {
      once = 1;
      $("body").removeClass("navHidden");
      $("body").addClass("bottomPadding");
    });
      $(window).bind('mousewheel', function(e){
        if(!once) {
            if(e.originalEvent.wheelDelta /120 < 0) {
              $(".scroll-container").fadeOut(300, function() { 
                $(this).html("");
                $("body").removeClass("navHidden");
                $("body").addClass("bottomPadding");

                $.get( "om-mig.html", function( data ) {
              var div = $(data).find(".barba-container");
              $(".scroll-container").html(div);
              $(".scroll-container").fadeIn(300);
            });
              });
            }
        once = 1;
        }
      });
  }
});
