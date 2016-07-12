$(function() {

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

    function dekdoiAbout(person) {
        $('.dekdoi-about h3').text(person.about);
    }

    function dekdoiExperience(person) {
        //console.log(person);
        var exps = person.experience;
        var ind;
        for (ind in exps) {
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
            var exp_display = '<div class="exp">' +
            '<div class="col-1-12">'+
            '</div>'+
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
        }
    }

    function dekdoiEducation(person) {
        var educations = person.educations;
        $.each(educations,function(index, value) {
            var education = value;

            // Get required fields:
            var institute = education.institute;
            var name = education.name;
            var duration = education.start + " to " + education.end;
            var location = education.location;

            // Put them together:
            var education_display = '<div class="col-1-3">' +
            '<h3>'+ institute+'</h3>' + 
            '<h3>'+ name +'</h3>' +
            '<h4>'+ duration +'</h4>';
            $(education_display).appendTo('#education');
        });
    }

    function dekdoiContact(person) {

    }

    function dekdoiMedia(person) {

    }

});
