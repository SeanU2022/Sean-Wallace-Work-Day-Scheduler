// DOM current date and time
$("#currentDay").text(moment().format("dddd, MMMM Do"));
$("#currentTime").text(moment().format("h:mm A"));
var displayTime = function () {
	$("#currentTime").text(moment().format("h:mm A"));
};

//DOM 
var tbodyElement = $('tbody');

// SHOW CLOCK FOR BETTER USER EXPERIENCE
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

// THE DAILY SCHEDULE COLOUR CODED
// timeblock format exexutes on page load
var hourColumnText;
var hourAsInteger = 0;
var hourColumnMiddayTrigger = false;

// $('.event-activity').each(function(index, value) {
// 	console.log(index);
// 	console.log($(this).text());
// 	console.log(value);
// });

// SAVE / RETRIEVE SCHEDULE FOR THE DAY, a schedule carries over when the day changes
// var workDayScheduleParsed = JSON.parse(window.localStorage.getItem('workDaySchedule')) || [];

function displaySchedule() {
	
	$('.event-activity').each(function(index, value) {
		// console.log('hello');
		// $( this ).text(workDayScheduleParsed[index]('timeBLock'));
		// if (workDayScheduleParsed[index] === $( this ).text) {
		// 	console.log($( this ).text);
		// 	// alert( $( this ).text);
		// }
	});
}

function retrieveSchedule() {
    // retrieve schedule into array or create empty array if none saved yet
	if (workDayScheduleToParse.length === 0) {
		return;
	}


	if (workDayScheduleTemp.length === 0) {
		return;
	}

	// alert(workDayScheduleTemp.length);
	// alert(workDayScheduleTemp[0].eventActivity);
	// var textToDisplay;
	// var indexToUse;
	// $('.event-activity').each(function(index, value) {
	// 	// $(this).text(index + 'nothing');
	// 	// $(this).text(workDayScheduleTemp.length);
	// 	if (workDayScheduleTemp.length === 0) {
	// 		// $(this).text('nothing');
	// 	} else {
	// 		// $(this).text('nothing');
	// 		// BUG BUG
	// 		// console.log($(workDayScheduleTemp[index].eventActivity));
	// 	}
	// 	indexToUse = index;
	// 	// $( this ).text(workDayScheduleTemp[0].eventActivity);
	// 	textToDisplay = workDayScheduleTemp[indexToUse].eventActivity; 
	// 	$( this ).text(textToDisplay);
	// });

}


//  XXXXXXX

    // sort quizScores by the score attribute in reverse order
    // quizScores.sort(function (a, b) {
    //     return b.score - a.score
    // });

    // build ordered list of scores and show
// var olEl = document.getElementById("quiz-scores");

// // make sure this element is clear of any previous lists but do not destroy it
// olEl.innerHTML = '';

// for (let index = 0; index < quizScores.length; index++) {
//     var liEl = document.createElement('li');
//     liEl.textContent = quizScores[index].initials + '- ' + quizScores[index].score;
//     olEl.appendChild(liEl);
    // }
//  XXXXXXX

// // var scdeduleTableEl = $('<tbody>');
// var scdeduleTableEl = $('header');
// // console.log('hello');

// // $(scdeduleTableEl).children('tr').children('col').text('O');

// console.log('hello sean');
// console.log(scdeduleTableEl.children('h1').text());
// console.log(scdeduleTableEl.children().eq(0).text());
// console.log(scdeduleTableEl.children().eq(1).text());

// scdeduleTBodyleEl = $('tbody');
// console.log(scdeduleTBodyleEl.children().eq(0).children().eq(2).children('button').text());
// console.log(scdeduleTBodyleEl.children('tr').children().eq(2).children('button').text());

// var saveBtnElClass 	= scdeduleTBodyleEl.children('tr').children().eq(2).children('saveBtn');
// var saveBtnEl 		= scdeduleTBodyleEl.children('tr').children().eq(2).children('button');

// // are they the same?
// console.log(saveBtnElClass);
// console.log(saveBtnEl);

// console.log(scdeduleTBodyleEl.children('tr').children().eq(2).children('saveBtn').text());


// console.log($(scdeduleTableEl).children('tr').children('col')[2].children('button').text);


// $(scdeduleTableEl).children('saveBtn').children('item-a3').text('O');
// $(scdeduleTableEl).children('saveBtn').text;


// TODO: Create a `<p>` element that will store an author's name and assign that created element to a new variable

// var authorEl = $('<p>');
// titleEl.attr('name', 'Sean');


// $(retrieveSchedule);
$(displaySchedule);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// form submit/save button


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function saveSchedule(saveTimeBlock, saveEventActivity) {	
																		console.log(saveTimeBlock + ' ===> ' + saveEventActivity);
    // retrieve saved scores into array or create empty array if none saved yet
    var workDayScheduleTemp = JSON.parse(window.localStorage.getItem('workDaySchedule')) || [];

	// alert(saveTimeBlock);
	// alert(saveEventActivity);


	if (saveTimeBlock === 0 || saveEventActivity.length === 0) {
		return;			// no point saving nothing
	}

    // params go into local object
    var timeBlockSchedule = {
        timeBlock: saveTimeBlock,
        eventActivity: saveEventActivity
    };

	// if timeBlock is already in local storage update it
    var doPush = true;
    var index = 0;
    while (index < workDayScheduleTemp.length) {
        // find the previous record and update it
        if (workDayScheduleTemp[index].timeBlock === timeBlockSchedule.timeBlock) {            
			workDayScheduleTemp[index].eventActivity = timeBlockSchedule.eventActivity;
            doPush = false;             		// do not create new record
            index = workDayScheduleTemp.length;     // finish the while loop early
        }
        else {
            // keep searching until all records have been traversed
            index++;
        }
    }

    // if previous loop did not find a previous score then add a new record
    if (doPush) {workDayScheduleTemp.push(timeBlockSchedule)};

    // put updated data back into the local store
    window.localStorage.setItem('workDaySchedule', JSON.stringify(workDayScheduleTemp));
};

function saveBtnClick (event) {
	event.preventDefault();
	event.stopPropagation();

	var btnClicked = $(event.target);
	var timeBLock = btnClicked.parent().prev().prev().text();
	var eventActivity = btnClicked.parent().prev().text();
																
	console.log('data in= '+ timeBLock);	console.log('data in= '+ eventActivity);
	
	saveSchedule(timeBLock, eventActivity);
}

tbodyElement.on('click', '.saveBtn', saveBtnClick);


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