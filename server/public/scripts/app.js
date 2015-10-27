

var peopleArray = [];

var indexTracker = 0;

var timeOutTimer;

var intervalFadeTimer = 10000;

$(document).ready(function(){
    $.ajax({
        type:"GET",
        url:"/data",
        success: function(data){
            peopleArray = data.zeta;
            init();
            updatePerson();
        }

    })
});


function init(){
    timeOutTimer = setInterval(intervalUpdate, intervalFadeTimer);
    createCarousel(peopleArray);

    updateIndexPoints();

    $("#next").on('click', nextSlide);
    $("#prev").on('click', prevSlide);
}

function resetInterval(){
    console.log('reset');
    clearInterval(timeOutTimer);
    timeOutTimer = setInterval(intervalUpdate, intervalFadeTimer);
}

function createCarousel(array){
    $("#lecture").append("<div class='main'></div>");
    var $el = $("#lecture").children().last();
    createNavButtons($el);
    createIndexPoints(array, $el);
}

function nextSlide(){
    indexTracker++;
    if(indexTracker >= peopleArray.length){
        indexTracker = 0;
    }
    resetInterval();
    updateIndexPoints();
}

function prevSlide(){
    indexTracker--;
    if(indexTracker < 0){
        indexTracker = peopleArray.length - 1;
    }
    resetInterval();
    updateIndexPoints();
}

function createNavButtons($el){
    $el.append("<div id='prev' class='nav-button'>Prev</div>");
    $el.append("<div id='next' class='nav-button'>Next</div>");
}

function createIndexPoints(array, $el){
    //create something visual, Divs will work
    for(var i = 0; i < array.length; i++){
        //we need i, 1 for each element
        console.log("In loop?");
        $el.append("<div class='index-point' id='index" + i + "'></div>")

    }
}

function updateIndexPoints(){
    for(var i = 0; i < peopleArray.length; i++){
        $("#index" + i).removeClass("index-point-active");

        if(i == indexTracker){
            $("#index" + i).addClass("index-point-active");
        }
    }
    updatePerson();
}

function updatePerson(){
    //peopleArray[ i ] , i == whatever indexTracker
    //write to the nodes on the DOM relative to the above

    $(".person-name").fadeOut(function(){
        $(this).text(peopleArray[indexTracker].name);
        $(this).fadeIn();
    });


    $(".person-github").fadeOut(function(){
        $(this).text(peopleArray[indexTracker].github);
        $(this).fadeIn();
    });


    $(".person-shoutout").fadeOut(function(){
        $(this).text(peopleArray[indexTracker].shoutout);
        $(this).fadeIn();
    });
}

function intervalUpdate(){
    indexTracker++;
    updatePerson();
    updateIndexPoints();
}