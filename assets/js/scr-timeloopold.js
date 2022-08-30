// $('.hour').each(function(i, obj) {
    $('.hour').each(function(index, value) {
        theHourNow = moment().format("hh"); 
        // console.log('index' + index + 'time now: ' + theHourNow );
        // console.log($(value).text());
        // console.log(theHourNow);
    
        $(this).siblings(".editable").eq(0).removeClass("past present future");
    
        if (theHourNow > parseInt($(value).text())) {
    
            console.log(theHourNow + "is >" + $(value).text());
    
            // $(this).siblings(".editable").eq(0).getCl
    
            // $(this).css("background-color", "#ff6961");
            // $(this).siblings(".bar").eq(0).text()
            // $(this).siblings(".editable").eq(0).css("background-color", "#ff6961");
            $(this).siblings(".editable").eq(0).addClass("past");
        }
        if (theHourNow = parseInt($(value).text())) {
            $(this).siblings(".editable").eq(0).addClass("present");
        }
    
        if (theHourNow < parseInt($(value).text())) {
            $(this).siblings(".editable").eq(0).addClass("future");
        }
    
    });
    
    

    // $('.hour').each(function(i, obj) {

        // console.log('index' + index + 'time now: ' + theHourNow );
        // console.log($(value).text());
        // console.log(theHourNow);
    
        $(this).siblings(".editable").eq(0).removeClass("past present future");
    
        if (theHourNow > parseInt($(value).text())) {
    
            console.log(theHourNow + "is >" + $(value).text());
    
            // $(this).siblings(".editable").eq(0).getCl
    
            // $(this).css("background-color", "#ff6961");
            // $(this).siblings(".bar").eq(0).text()
            // $(this).siblings(".editable").eq(0).css("background-color", "#ff6961");
            $(this).siblings(".editable").eq(0).addClass("past");
        }
        if (theHourNow = parseInt($(value).text())) {
            $(this).siblings(".editable").eq(0).addClass("present");
        }
    
        if (theHourNow < parseInt($(value).text())) {
            $(this).siblings(".editable").eq(0).addClass("future");
        }
    
