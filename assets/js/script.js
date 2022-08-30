var todaysDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(todaysDate);

var time = moment().format("hh:mm:ss");
var timeHourNow = moment().format("hh");
$("#4a").text(time);
$("#4b").text(timeHourNow);


// using AM/PM
var theHourNow = moment().format("hh");
console.log(theHourNow);


// this is outside of a function so that is exexutes on page load
var hourColumnText;
var hourAsInteger = 0;
var hourColumnMiddayTrigger = false;
var hourColumnArrayAs24Hr = [];

// populate hourColumnArrayAs24Hr from the .hour column converting to 24HR format
$('.hour').each(function(index, value) {

	hourColumnText = $(value).text();
	hourAsInteger = parseInt(hourColumnText.substring(0, 2));	// assumption: 1 PM not 1PM

	// if we have passed 12pm add 12 to the number
	if (hourColumnMiddayTrigger) {
		hourAsInteger = hourAsInteger + 12;
	}

	// in scope="col": only set flag to true after we have passed 12
	// assumption: there is only one occcurance of 12 in the scope="col"
	if (hourAsInteger === 12) {
		hourColumnMiddayTrigger = true;
	}

	// ARRAY TO TEST THE LOGIC:
	// hourColumnArrayAs24Hr.push(hourAsInteger);

	if (hourAsInteger < moment().format("HH")) {
		$( this ).parent().addClass('past');
		$( this ).next().removeClass('editable');
	} else if (hourAsInteger > moment().format("HH")) {
		$( this ).parent().addClass('future');	
	} else {
		$( this ).parent().addClass('present');	
	}
});


// $('.hour').each(function(index, value) {
// 	// $('<td>').addClass('p-2');
// 	console.log( $( this ).parent() );



// 	$( this ).parent().addClass('past');
// });

// if (theHourNow > hourColumnArrayAs24Hr){
// 	// $(this).css("background-color", "pink");
// 	var myEl = $('.hour');
// 	$(parent).attr("class","past");
// }

// var projectNameTdEl = $('<td>').addClass('p-2');



// if ($('td').hasClass('hour')) {
//     // alert('hello');
//     console.log( $( "td" )[ 0 ]);
//     // var value = $( this ).val();
//     // var value = $('td').hasClass('hour').val();
//     var inputString = $('td')[0].val();
//     var value = ($('td')[0]).text;
//     alert(inputString);
//     // alert(this.val());
//     // $( "p" ).text( value );

//     if (timeHourNow > value) {
//         // $(this).css("background-color", "red");
//         $(this).text = 'hello';
//     } else {
        
//     }
    
// }


var objDate = new Date();
//     var hours = objDate.getHours();
//     if(hours >= 9 && hours <= 17){
//         $(".hour").addClass("present");
//     }
//     elseif(hours < 9){
//         $(".hour").addClass("past");
//     }
//     else{
//         $(".hour").addClass("future");
//     }


// https://mindmup.github.io/editable-table
// /*global $, window*/
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

                // only one column class can be edited
                // Sean Wallace 2022
                if (!active.hasClass('editable')) {
                    return;
                }

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
				setActiveText();
				editor.hide();
				active.focus();
				e.preventDefault();
				e.stopPropagation();
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
				showEditor(false);
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
$.fn.editableTableWidget.defaultOptions = {
	cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
					  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
					  'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
	editor: $('<input>')
};

$('table td').on('change', function(evt, newValue) {
    alert(newValue);
	// do something with the new cell value 
	console.log($('td').hasClass('col-1'));
    if ($('td').hasClass('col-1')) { 
        alert('cannot edit me!');
		return false; // reject change
	}
});

// $("#daily-schedule").SetEditable();
$('#daily-schedule').editableTableWidget();

$("#business").click(function(event){
    jQuery.fx.off = true;
    $("#businessmenu").toggle("");
    $(this).css("background-color", "#000");
    event.stopPropagation();
});


// 

// $('html').click(function() {


//     $("#businessmenu").hide();
//     $("#business").css("background-color", "#323232");


//     $("#business").css({
//         "background": "#000"
//     });

// });