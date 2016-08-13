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
    $("a[href^='#']").on({
        click: function(e) {
            e.preventDefault();
            var id = $(this).attr("href"); // grab the href attribute value
            if ($(id).length > 0) {
                // prevents default behavior of links.
                e.preventDefault();

                // trigger scroll
                mainController.scrollTo(id);
            }

            /* Re-color */
            reFocusNav($(this));
        }
    });

    /* Re-assign the focus class to the new one */
    function reFocusNav(obj) {
        var prev = $("a[class='currentItem'");
        prev.removeClass('currentItem');
        obj.addClass('currentItem');
    }

    /* Apply Class Toggle as user scrolls down */
    var aboutScene = new ScrollMagic.Scene({
            triggerElement: "#about"
        })
        .addIndicators(); // add indicators (requires plugin)

    var projectsScene = new ScrollMagic.Scene({
            triggerElement: "#projects"
        })
        .addIndicators(); // add indicators (requires plugin)

    var educationScene = new ScrollMagic.Scene({
            triggerElement: "#education"
        })
        .addIndicators(); // add indicators (requires plugin)

    var contactScene = new ScrollMagic.Scene({
            triggerElement: "#contact"
        })
        .addIndicators(); // add indicators (requires plugin)

    var mediaScene = new ScrollMagic.Scene({
            triggerElement: "#media"
        })
        .addIndicators(); // add indicators (requires plugin)

    /* Add Scenes to ScrollMagic Controller */
    mainController.addScene([
        aboutScene,
        projectsScene,
        educationScene,
        contactScene,
        mediaScene
    ]);

});
