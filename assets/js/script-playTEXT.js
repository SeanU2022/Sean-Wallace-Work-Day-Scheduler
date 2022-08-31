// DOM current date and time
$("#currentDay").text(moment().format("dddd, MMMM Do"));
$("#currentTime").text(moment().format("h:mm A"));          // better uesr experience: this code (duplicate of displayTime logic) shows time at the start of DOM load before ready() is triggered
var displayTime = function () {
	$("#currentTime").text(moment().format("h:mm A"));
};

function init(){
    // the code to be called when the dom has loaded?    $(document).ready(function() works when init() didn't in testing
    // setInterval(displayTime, 1000);
}

$(document).ready(function(){
    setInterval(displayTime, 1000);
});

$(document).onbeforeunload = unLoad; 
function unLoad() {
	clearInterval(displayTime);	
	return null;
}


// THE DAILY SCHEDULE
// timeblock format exexutes on page load
var hourColumnText;
var hourAsInteger = 0;
var hourColumnMiddayTrigger = false;

// colour/color code #daily-schedule rows to .past, .present, .future based on the current hour
// we assume the times go from AM to PM with 12 PM included
$('.hour').each(function(index, value) {

	// make displayed time an integer
	hourColumnText = $(value).text();
	hourAsInteger = parseInt(hourColumnText.substring(0, 2));	// assumption: 1 PM not 1<space>PM

	// if we have passed 12pm add 12 to the number
	if (hourColumnMiddayTrigger) {
		hourAsInteger = hourAsInteger + 12;
	}

	// in index.html scope="col": only set flag to true after we have passed 12
	// assumption: there is only one occcurance of 12 in the scope="col"
	if (hourAsInteger === 12) {
		hourColumnMiddayTrigger = true;
	}

	// no need to clean up any previous format settings as this is on page load

	if (hourAsInteger < moment().format("HH")) {
		$( this ).parent().addClass('past');
//XX		$( this ).next().removeClass('editable');
	} else if (hourAsInteger > moment().format("HH")) {
		$( this ).parent().addClass('future');	
	} else {
		$( this ).parent().addClass('present');	
	}

	$( this ).next().attr('disabled','disabled');
});

function retrieveSchedule() {
    // // retrieve saved scores into array or create empty array if none saved yet
    // var quizScores = JSON.parse(window.localStorage.getItem('quizScores')) || [];

    // // sort quizScores by the score attribute in reverse order
    // quizScores.sort(function (a, b) {
    //     return b.score - a.score
    // });

    // // build ordered list of scores and show
    // var olEl = document.getElementById("quiz-scores");

    // // make sure this element is clear of any previous lists but do not destroy it
    // olEl.innerHTML = '';

    // for (let index = 0; index < quizScores.length; index++) {
    //     var liEl = document.createElement('li');
    //     liEl.textContent = quizScores[index].initials + '- ' + quizScores[index].score;
    //     olEl.appendChild(liEl);
    // }
}

function saveSchedule(userInitials, userScore) {
    // // scope local over global
    // if (userInitials==='') {
    //     console.log('saveScore error');
    //     return;
    // }
    
    // // retrieve saved scores into array or create empty array if none saved yet
    // var quizScores = JSON.parse(window.localStorage.getItem('quizScores')) || [];

    // // params go into local object
    // var personsScore = {
    //     initials: userInitials,
    //     score: userScore
    // };

    // // a more advanced technique?  TODO: research this
    // // let results = [{country: 'France'},{country: 'Brazil'},{country: 'Dubai'},{country: 'Ireland'}];
    // // let result = {country: 'Brazil'};
    // // countryExist = results.some(obj => obj.country === result.country);
    // // if (!countryExist) {
    // // results.push(result);
    // // addToLocalStorage(results);
    // // }

    // // if user has a previous score already stored save the highest of previous or current score
    // var doPush = true;
    // var index = 0;
    // while (index < quizScores.length) {
    //     // find the previous record and update it
    //     if (quizScores[index].initials === personsScore.initials) {
            
    //         // only record the highest score for this user
    //         if (quizScores[index].score < personsScore.score) {
    //             quizScores[index].score = personsScore.score;
    //         } else {
    //             // keep the old score if it is >= current score
    //         }            
    //         doPush = false;                 // do not create new record
    //         index = quizScores.length;      // finish the while loop early
    //     }
    //     else {
    //         // keep searching until all records have been traversed
    //         index++;
    //     }
    // }

    // // if previous loop did not find a previous score then add a new record
    // if (doPush) {quizScores.push(personsScore)};

    // // put updated data back into the local store
    // // localStorage.quizScores.initials = personsScore.initials // from userInitials
    // // localStorage.quizScores.score = personsScore.score // from userScore
    // window.localStorage.setItem('quizScores', JSON.stringify(quizScores));

    // // jump to the scores page
    // window.location.href = "quizscores.html"
};

// start
// startBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     startQuiz();
//     doQuiz(currentKnowledgeTest);
// });

// submit after quiz
// allDoneSubmitBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//     event.stopPropagation();

//     var userInitials = document.querySelector('#initials').value.trim();
//     if (userInitials === '' || userInitials.length > 5) {
//         alert('Please enter your initials [up to 5 letters]');
//     } else {
//         saveScore(userInitials, finalScore);
//     }
// });
