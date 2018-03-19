// Create a grid that a user can color with clicks
//   - allows grid size entry and color selection

// When size is submitted by the user, call makeGrid()

// Set the inital 'paint' changes happen in click event
const PAINT = 'PAINT';
const ERASE = 'ERASE';
let gridTileMode = PAINT // controls paint or erase of grid cells (td's)

$('#createGrid').on('click', function makeGrid(event) {
    // prevent page refreshing when clicking submit
    event.preventDefault();
    let mouseIsDown = false;
    let grid = $('#pixelCanvas');
    let rows = $("#inputHeight").val();
    let columns = $("#inputWidth").val();

    grid.children().remove(); // delete any previous table rows

//Build the grid row by row and then append to the table
//  project rubrics requires use of for and while loops

    let tableRows = '';
    let r = 1;
    while (r <= rows) {
        tableRows += '<tr>';
        for (let c=1; c <= columns; c++) {
            tableRows += '<td></td>';
        }
        tableRows += '</tr>';
        r += 1;
    } // end while loop
    $(grid).append(tableRows); // add grid to DOM
    $('.legend').show(); // <p> tag with instructions for mouseover

// Listen for click to paint or erase a tile

    grid.on('click', 'td', function() {
        paintEraseTiles($(this));
    });

// Listen for mouse down, up and over for continuous paint and erase

    grid.on('mousedown', function(event) {
        event.preventDefault();
        mouseIsDown = event.which === 1 ? true : false;
    });

    grid.on('mouseup', function() {
        mouseIsDown = false;
    });

    grid.on('mouseover', 'td', function() {
        if (mouseIsDown) {paintEraseTiles($(this));}
    }); // end continuous paint and erase
}); // end grid

// paint or erase cells based on the mode (girdTileMode)

function paintEraseTiles(targetCell) {
    if (gridTileMode === PAINT) {
        $(targetCell).css('background-color', $('#colorPicker').val());
    } else if (gridTileMode === ERASE) {
        $(targetCell).css('background-color', 'transparent');
    }
}

    $('#inputHeight').on('input', function() {
        $('#gridHeightDisplay').text(' ' + $(this).val());
    });

    $('#inputWidth').on('input', function() {
        $('#gridWidthDisplay').text(' ' + $(this).val());
    });

    $('#colorPicker').on('input', function() {
        gridTileMode = PAINT;
        $('.paintOrErase').text(' ' + gridTileMode);
    });

// set the mode to PAINT or ERASE

    $('button').on('click', function(event) {
        gridTileMode = event.currentTarget.id === 'paintBtn' ? PAINT : ERASE;
        $('.paintOrErase').text(' ' + gridTileMode);
    }); // end button on click
