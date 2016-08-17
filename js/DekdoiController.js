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

    /* Apply Animations to each section */
    /* Start Of About Scene */
    var aboutTitle = $('#aboutTitle');
    var aboutTween = new TimelineLite();
    aboutTween.from(aboutTitle, 9, { left: '70%', opacity: 0 });
    var aboutScene = new ScrollMagic.Scene({
            triggerElement: "#about",
            reverse: false
        })
        .setTween(aboutTween)
        .addIndicators(); // add indicators (requires plugin)
    /* End of About Scene */
    /* Start of Project Scene */
    var projectsScene = new ScrollMagic.Scene({
            triggerElement: "#projects"
        })
        .addIndicators(); // add indicators (requires plugin)
    /* End Of Project Scene */
    // Start of Education Scene
    var educationScene = new ScrollMagic.Scene({
            triggerElement: "#education",
            reverse: false
        })
        .addIndicators(); // add indicators (requires plugin)
    /* End Of Education Scene */
    /* Start of Contact Scene */
    var contactLogoTween = TweenMax.to($("#contactIcons a"), 1, { 'font-size': '50' });
    var contactScene = new ScrollMagic.Scene({
            triggerElement: "#contact"
        })
        .setTween(contactLogoTween)
        .addIndicators({ name: "contact (duration: 1)" }); // add indicators (requires plugin)
    /* End Of Contact Scene */
    /* Start of Media Scene */
    var mediaScene = new ScrollMagic.Scene({
            triggerElement: "#media"
        })
        .addIndicators(); // add indicators (requires plugin)
    /* End Of Media Scene */

    /* Add Scenes to ScrollMagic Controller */
    mainController.addScene([
        aboutScene,
        projectsScene,
        educationScene,
        contactScene,
        mediaScene
    ]);

});
