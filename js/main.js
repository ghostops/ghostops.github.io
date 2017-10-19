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

if (window.location.host.substr(-14) == '.larsendahl.se' && window.location.protocol != 'https:') {
    window.location.protocol = 'https:';
}

// Hero typing
var typed = new Typed('.heroHeading', {
  strings: ["Ludvig Larsendahl", "Full-Stack Webdev"],
  typeSpeed: 60,
  startDelay: 500,
  backDelay: 1000,
});