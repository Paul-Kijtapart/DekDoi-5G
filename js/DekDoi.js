$(function() { // Wait for Document ready

    /* Main Controller For ScrollTO elements */
    var mainController = new ScrollMagic.Controller();

    var name = "Trirutda";


    // Get Data from JSON file:
    $.ajax({
        url: 'document/DekDoi.json',
        type: 'GET',
        dataType: "json",
        data: { param1: 'value1' },
        complete: function(xhr, textStatus) {
            //called when complete
        },
        success: function(data, textStatus, xhr) {
            //called when successful
            var current_dekdoi = data[name];
            // Functions for each section:
            dekdoiAbout(current_dekdoi);
            dekdoiExperience(current_dekdoi);
            dekdoiEducation(current_dekdoi);
            dekdoiContact(current_dekdoi);
            dekdoiMedia(current_dekdoi);

        },
        error: function(xhr, textStatus, errorThrown) {
            //called when there is an error
        }
    });

    /* ABOUT */
    function dekdoiAbout(person) {
        $('#aboutTitle').text("Hi, I see you found my little corner on the internet.");
        var description = $('.dekdoi-about h3');
        description.text(person.about);
    }

    /* Start Of About Scene */
    var aboutTitle = $('#aboutTitle');
    var aboutDescription = $('.dekdoi-about h3');
    var aboutTween = new TimelineLite();
    aboutTween.from(aboutTitle, 3, { left: '70%', opacity: 0 });
    aboutTween.from(aboutDescription, 2, { y: 200, opacity: 0 });
    var aboutScene = new ScrollMagic.Scene({
            triggerElement: "#about",
            reverse: false
        })
        .setTween(aboutTween)
        .addIndicators(); // add indicators (requires plugin)
    /* End of About Scene */


    /* Experience */
    function dekdoiExperience(person) {
        $('#projectTitle').text("Experience");
        var exps = person.experience;

        for (var ind in exps) {
            var exp = exps[ind];

            // Get required fields
            var name = exp.name;
            var duration = exp.start + " to " + exp.end;
            var description = exp.description;
            var responsibilities = exp.responsibilities;
            var responsibilitie = '';
            for (var i in responsibilities) {
                responsibilitie += '<li>' + responsibilities[i] + '</li>';
            }

            // Put them together. format exp_display to display on html
            var exp_display = '<div id="exp' + ind + '" class="exp">' +
                '<div class="col-1-12">' +
                '<div class="timeline"></div>' +
                '</div>' +
                '<div class="col-11-12">' +
                '<h2>' + name + '</h2>' +
                '<p> DURATION: <strong>' + duration + '</strong>' + '</p>' +
                '<p> DESCRIPTION: <strong>' + description + '</strong>' + '</p>' +
                '<p> RESPONSIBILITIES: </p>' +
                '<ul>' +
                responsibilitie +
                '</ul>' +
                '</div>' +
                '</div>';
            $(exp_display).appendTo('#experience');

            /* Apply exp scene */
            var expScene = new ScrollMagic.Scene({
                    triggerElement: "#exp" + ind,
                    reverse: false
                })
                .addIndicators({ name: "exp" + ind })
                .addTo(mainController);
        }
    }

     // Start of Project Scene 
    var projectTitle = $('#projectTitle');
    var projectTween = new TimelineLite();
    projectTween.from(projectTitle, 3, { left: '70%', opacity: 0 });
    var projectsScene = new ScrollMagic.Scene({
            triggerElement: "#projects",
            reverse: false
        })
        .setTween(projectTween)
        .addIndicators(); // add indicators (requires plugin)

    // End Of Project Scene

    /* Education */
    function dekdoiEducation(person) {
        $('educationTitle').text('Education');
        var educations = person.educations;
        $.each(educations, function(index, value) {
            var education = value;

            // Get required fields:
            var institute = education.institute;
            var name = education.name;
            var duration = education.start + " to " + education.end;
            var location = education.location;

            // Put them together:
            var education_display = '<div class="col-1-3">' +
                '<h3>' + institute + '</h3>' +
                '<h3>' + name + '</h3>' +
                '<h4>' + duration + '</h4>';
            $(education_display).appendTo('#educationContent');
        });
    }
     // Start of Education Scene 
    var educationScene = new ScrollMagic.Scene({
            triggerElement: "#education",
            reverse: false
        })
        .addIndicators(); // add indicators (requires plugin)
    // End Of Education Scene 

    /* Contract */
    function dekdoiContact() {
        $('#contactTitle').text('Contact');
        $('form[id="contactForm"]').on('submit', function(event) {
            event.preventDefault();
            /* Validate the input first */
            var form = $('form[id="contactForm"]');
            form.validate();

            /* Check if form is valid() */
            if (!form.valid()) {
                console.log("Form is not valid. Please try again!");
                return;
            }

            /* Pass onto php */
            $.ajax({
                    url: 'php/DekDoi-form.php',
                    type: 'POST',
                    data: $('form').serialize()
                })
                .done(function() {
                    console.log("success contact");
                })
                .fail(function() {
                    console.log("error contact");
                })
                .always(function() {
                    console.log("complete contact");
                });
        });
    }
     // Start of Contact Scene 
    var contactLogoTween = TweenMax.to($("#contactIcons a"), 1, { 'font-size': '50' });
    var contactScene = new ScrollMagic.Scene({
            triggerElement: "#contact"
        })
        .setTween(contactLogoTween)
        .addIndicators({ name: "contact (duration: 1)" }); // add indicators (requires plugin)
    // End Of Contact Scene 


    /* Resume and Media section */
    function dekdoiMedia(person) {
        console.log("media run");
    }
    // Start of Media Scene
    var mediaScene = new ScrollMagic.Scene({
            triggerElement: "#media"
        })
        .addIndicators(); // add indicators (requires plugin)
    // End Of Media Scene 

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

    /* Add Scenes to ScrollMagic Controller */
    mainController.addScene([
        aboutScene,
        projectsScene,
        educationScene,
        contactScene,
        mediaScene
    ]);


});
