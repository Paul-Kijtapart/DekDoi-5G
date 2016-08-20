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
    /* Start Of About Scene */
    var aboutTitle = $('#aboutTitle');
    var aboutDescription = $('.dekdoi-about h3');
    var aboutTween = new TimelineLite();
    aboutTween.from(aboutTitle, 3, { left: '70%', opacity: 0 });

    function dekdoiAbout(person) {
        $('#aboutTitle').text("About");
        var description = $('.dekdoi-about h3');
        description.text(person.about);

        var profilePic = '<img src="' + person.image + '" >';
        $(profilePic).appendTo("#profilePic");


        aboutTween.from($("#profilePic img"), 0.5, { scale: 0.5, autoAlpha: 0 }, "+=0.5");
        aboutTween.from(aboutDescription, 4, { y: 200, opacity: 0 });
    }
    var aboutScene = new ScrollMagic.Scene({
            triggerElement: "#about",
            reverse: false
        })
        .setTween(aboutTween);
    // .addIndicators();
    /* End of About Scene */


    /* Experience */
    var projectsScene = new ScrollMagic.Scene({ // Start of Project Scene 
        triggerElement: "#projects",
        reverse: false
    });
    // .addIndicators(); 
    function dekdoiExperience(person) {
        $('#projectTitle').text("Experience");
        var exps = person.experience;

        /* Animation on Enter Project Section */
        var projectTitle = $('#projectTitle');
        var projectTween = new TimelineLite();
        projectTween.from(projectTitle, 3, { left: '70%', opacity: 0 });
        projectsScene.setTween(projectTween);

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
                '<div id="timeline' + ind + '" class="timeline"></div>' +
                '</div>' +
                '<div id="expDetail' + ind + '" class="col-11-12">' +
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
            var currentTimeline = $('#timeline' + ind);
            var currentDetail = $('#expDetail' + ind);
            var expTween = new TimelineLite();
            var timelineTween = TweenLite.from(currentTimeline, 2, { backgroundColor: "blue", height: 0 });
            var detailTween = TweenLite.from(currentDetail, 2, { opacity: 0 });
            expTween.insert(timelineTween);
            expTween.insert(detailTween);
            var expScene = new ScrollMagic.Scene({
                    triggerElement: "#exp" + ind,
                    reverse: false
                })
                .setTween(expTween)
                .addTo(mainController);
            // .addIndicators({ name: "exp" + ind })
        }
    }

    /* Education */
    // Start of Education Scene
    var educationScene = new ScrollMagic.Scene({
        triggerElement: "#education",
        reverse: false
    });
    // .addIndicators();
    // End Of Education Scene 
    function dekdoiEducation(person) {
        var educationTitle = $('#educationTitle');
        educationTitle.text('Education');

        // Add Effect to the title
        var educationTitleTween = TweenLite.from(educationTitle, 3, { left: '70%', opacity: 0 });
        educationScene.setTween(educationTitleTween);

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

    // contactLogoTween.add(TweenLite.to($("#contactIcons a"), 1, { left: '5%' }, "+=0.5"));

    // Start of Contact Scene 
    var contactTween = new TimelineLite();
    var contactTitleTween = TweenLite.from($("#contactTitle"), 3, { left: '70%', opacity: 0 });
    var contactLogoTween = new TimelineLite();
    contactLogoTween.add(TweenLite.to($("#contactIcons a"), 1, { left: '50%', margin: '10px' }, "+=0.5"));
    contactLogoTween.add(TweenLite.to($("#contactIcons a"), 1, { 'font-size': '50' }));

    // Media Animation
    var mediaTween = new TimelineLite();
    mediaTween.add(function() {
        getSkewAnimation($("#mediaContent"));
    });
    mediaTween.to($("#media"), 1, { backgroundColor: "white", delay : 1.5 }, "after");
    mediaTween.to($("#mediaContent a"), 1, { color: "black", "border-color": "black" }, "after");

    // Put it together 
    contactTween.insert(contactTitleTween);
    contactTween.insert(contactLogoTween);
    contactTween.add(mediaTween);

    var contactScene = new ScrollMagic.Scene({
            triggerElement: "#contact",
            reverse: false
        })
        .setTween(contactTween);
    // .addIndicators({ name: "contact (duration: 1)" });
    // End Of Contact Scene 


    /* Resume and Media section */
    function dekdoiMedia(person) {
        console.log("media run");
    }
    // Start of Media Scene
    var mediaScene = new ScrollMagic.Scene({
        triggerElement: "#media",
        reverse: false
    });

    function getSkewAnimation(skew) {
        var skewTimeline = new TimelineLite();
        skewTimeline.to(skew, 0.5, { skewX: 45 })
            .to(skew, 0.8, { skewX: -45 })
            .to(skew, 0.5, { skewX: 0, skewY: 0 });
        return skewTimeline;
    }

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
