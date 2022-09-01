// DOM current date and time
$("#currentDay").text(moment().format("dddd, MMMM Do"));
$("#currentTime").text(moment().format("h:mm A"));
var displayTime = function () {
	$("#currentTime").text(moment().format("h:mm A"));
};

// GET THE DATA FIRST THING!
// SAVE / RETRIEVE SCHEDULE FOR THE DAY, a schedule carries over when the day changes
var workDayScheduleParsed = JSON.parse(window.localStorage.getItem('workDaySchedule')) || [];

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
		$( this ).next().removeClass('editable');
	} else if (hourAsInteger > moment().format("HH")) {
		$( this ).parent().addClass('future');	
	} else {
		$( this ).parent().addClass('present');	
	}
});

// EDIT SCHEDULE ROW
// from https://mindmup.github.io/editable-table
// modifications shown with comment "// Sean Wallace 2022:" 
// Enable the edit Activity/Task in a timeblock
// /*global $, window*/
// Sean Wallace 2022: I did not write this code but during testing it integrates well 
$.fn.editableTableWidget = function (options) {
	'use strict';
	return $(this).each(function () {
		var buildDefaultOptions = function () {
				var opts = $.extend({}, $.fn.editableTableWidget.defaultOptions);
				opts.editor = opts.editor.clone();
				return opts;
			},
			activeOptions = $.extend(buildDefaultOptions(), options),
			ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9,
			element = $(this),
			editor = activeOptions.editor.css('position', 'absolute').hide().appendTo(element.parent()),
			active,
			showEditor = function (select) {
				active = element.find('td:focus');
// Sean Wallace 2022: only one column class can be edited
                if (!active.hasClass('editable')) {
                    return;
                }
// Sean Wallace 2022: only one column class can be edited
				if (active.length) {
					editor.val(active.text())
						.removeClass('error')
						.show()
						.offset(active.offset())
						.css(active.css(activeOptions.cloneProperties))
						.width(active.width())
						.height(active.height())
						.focus();
					if (select) {
						editor.select();
					}
				}
			},
			setActiveText = function () {
				var text = editor.val(),
					evt = $.Event('change'),
					originalContent;
				if (active.text() === text || editor.hasClass('error')) {
					return true;
				}
				originalContent = active.html();
				active.text(text).trigger(evt, text);
				if (evt.result === false) {
					active.html(originalContent);
				}
			},
			movement = function (element, keycode) {
				if (keycode === ARROW_RIGHT) {
					return element.next('td');
				} else if (keycode === ARROW_LEFT) {
					return element.prev('td');
				} else if (keycode === ARROW_UP) {
					return element.parent().prev().children().eq(element.index());
				} else if (keycode === ARROW_DOWN) {
					return element.parent().next().children().eq(element.index());
				}
				return [];
			};
		editor.blur(function () {
			setActiveText();
			editor.hide();
		}).keydown(function (e) {
			if (e.which === ENTER) {
// Sean Wallace 2022: disable ENTER so that textarea behaves as expected
				// setActiveText();
				// editor.hide();
				// active.focus();
				// e.preventDefault();
				// e.stopPropagation();
// Sean Wallace 2022: disable ENTER so that textarea behaves as expected
			} else if (e.which === ESC) {
				editor.val(active.text());
				e.preventDefault();
				e.stopPropagation();
				editor.hide();
				active.focus();
			} else if (e.which === TAB) {
				active.focus();
			} else if (this.selectionEnd - this.selectionStart === this.value.length) {
				var possibleMove = movement(active, e.which);
				if (possibleMove.length > 0) {
					possibleMove.focus();
					e.preventDefault();
					e.stopPropagation();
				}
			}
		})
		.on('input paste', function () {
			var evt = $.Event('validate');
			active.trigger(evt, editor.val());
			if (evt.result === false) {
				editor.addClass('error');
			} else {
				editor.removeClass('error');
			}
		});
		element.on('click keypress dblclick', showEditor)
		.css('cursor', 'pointer')
		.keydown(function (e) {
			var prevent = true,
				possibleMove = movement($(e.target), e.which);
			if (possibleMove.length > 0) {
				possibleMove.focus();
			} else if (e.which === ENTER) {
// Sean Wallace 2022: disable ENTER so that textarea behaves as expected
				// showEditor(false);
// Sean Wallace 2022: disable ENTER so that textarea behaves as expected
			} else if (e.which === 17 || e.which === 91 || e.which === 93) {
				showEditor(true);
				prevent = false;
			} else {
				prevent = false;
			}
			if (prevent) {
				e.stopPropagation();
				e.preventDefault();
			}
		});

		element.find('td').prop('tabindex', 1);

		$(window).on('resize', function () {
			if (editor.is(':visible')) {
				editor.offset(active.offset())
				.width(active.width())
				.height(active.height());
			}
		});
	});

};

// Sean Wallace 2022: I did not write this code but during testing it integrates well
$.fn.editableTableWidget.defaultOptions = {
cloneProperties: [
    "padding",
    "padding-top",
    "padding-bottom",
    "padding-left",
    "padding-right",
    "text-align",
    "font",
    "font-size",
    "font-family",
    "font-weight",
    "border",
    "border-top",
    "border-bottom",
    "border-left",
    "border-right",
],
// Sean Wallace 2022: use textarea instead of input for multiline
  	// editor: $('<input>')
	editor: $('<textarea class="form-control" rows="2">')
// Sean Wallace 2022: use textarea instead of input for multiline
};

$('#daily-schedule').editableTableWidget();
