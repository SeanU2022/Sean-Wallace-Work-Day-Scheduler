var todaysDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(todaysDate);

// $(document).ready(function() {
//     $('#example').DataTable();
// } );

var $table = $('<table>');

// $table.append( '<tr><th>hello</th></tr>' );
$table.append( '<tr>');
// $table.append( '<th>hello</th>' );
// $table.append( '<th>there</th>' );
// $table.append( '<th>I am here</th>' );

// $table.append( '<tr>');
// $table.append( '<td> data1 </td>' );
// $table.append( '<td> data2 </td>' );
// $table.append( '<td> data3 </td>' );


for (let columnNumber = 0; columnNumber < 3; columnNumber++) {
        $table.append( '<th>column' + columnNumber + '</th>' );    
}

for (let hourlySlot = 0; hourlySlot < 13; hourlySlot++) {
    $table.append( '<tr>');
    $table.append( '<td>' + (hourlySlot+8) + 'am/pm' + '</td>' );
    $table.append( '<td>' + 'task to do' + '</td>' );
    $table.append( '<td>' + 'ICON' + '</td>' );
}


// $table.append( '<th>' + 'this columntwo' + index + '</th>' );
// $table.append( '<th>' + 'this columnthree' + index + '</th>' );




// for (let index = 0; index < 4; index++) {
//     // const element = array[index];

//     $table.append( '<tr><th>' + 'this column' + index + '</th></tr>' );

// }

//     for(var i=0; i<3; i++){
//         $table.append( '<tr><td>' + 'result' +  i + '</td></tr>' );
//     }

    


$('#here_table').append($table);