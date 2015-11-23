var cohort = 0;
var etaArray = [];
var preButton = cohort - 1;
var nexButton = cohort + 1;


$(function() {
  var rightTemplate = Handlebars.compile($('#rightbutton').html());
  var leftTemplate = Handlebars.compile($('#leftbutton').html());
  var primeTemplate = Handlebars.compile($('#coders').html());
  function getData () {
  $.ajax({
    url: '/data/eta.json'
  })
        .done(function(json) {
          var compiledHtml = primeTemplate(json.eta[cohort]);
          $('.primePeople').html(compiledHtml);
          for (var i = 0; i <= json.eta.length - 1; i++) {
          	etaArray.push(json.eta[i]);
          }
          preButton = etaArray.length - 1;
        });
};

function leftButton() {
  $.ajax({
    url: '/data/eta.json'
  })
        .done(function(json) {
          var compiledHtml = leftTemplate(json.eta[preButton]);
          $('.primelButtons').html(compiledHtml);
          
        });
};

function rightButton() {
  $.ajax({
    url: '/data/eta.json'
  })
        .done(function(json) {
          var compiledHtml = rightTemplate(json.eta[nexButton]);
          $('.primerButtons').html(compiledHtml);
          // var nextCohort = 0;
          // for (var i = 0; i < json.eta.length; i++) {
          //   nextCohort += 1;
            

          // }

        });
};
function changeCohort() {
          var compiledHtml = primeTemplate(etaArray[cohort]);
          $('.primePeople').html(compiledHtml);
};

getData();
leftButton();
rightButton();
console.log(etaArray.length);

$('body').on('click','.rbutton', function(){

	cohort++;
	nexButton++;
	preButton++;
	if (cohort > etaArray.length - 1) {
		cohort = 0;
	}
	if (nexButton > etaArray.length - 1) {
		nexButton = 0;
	}
	if (preButton > etaArray.length - 1) {
		preButton = 0;
	}
	changeCohort();
	rightButton();
	leftButton();
})

$('body').on('click','.lbutton', function(){

	cohort--;
	preButton--;
	nexButton--;
	if (cohort < 0) {
		cohort = etaArray.length - 1;
	}
	if (preButton < 0) {
		preButton = etaArray.length - 1;
	}
	if (nexButton < 0) {
		nexButton = etaArray.length - 1;
	}
	changeCohort();
	leftButton();
	rightButton();
})

});