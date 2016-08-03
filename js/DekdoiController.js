$(function() { // Wait for Document ready

    /* Main Controller For ScrollTO elements */
    var mainController = new ScrollMagic.Controller();



    /* SetUP ScrollTO elements */
    mainController.scrollTo(function(target) {
        TweenMax.to(window, 1.5, {
            scrollTo: {
                y: target, // scroll position of the target along y axis
                offsetY: 70,
                autoKill: true // allows user to kill scroll action smoothly
            },
            ease: Cubic.easeInOut
        });

    });

    $("a[href^='#']").on("click", function(e) {
        console.log("CHECK");
        var id = $(this).attr("href"); // grab the href attribute value
        if ($(id).length > 0) {
            // prevents default behavior of links.
            e.preventDefault();

            // trigger scroll
            mainController.scrollTo(id);
        }
    });


});
