var consoleTable = function (table) {
    var cols = 0;
    var colWidths = [];

    table.forEach(function (row, index) {
        cols = Math.max(cols, row.length);
        
        row.forEach(function (cell, index) {
            if (!colWidths[index]) {
                colWidths[index] = 0;
            }
            colWidths[index] = Math.max(colWidths[index], cell.toString().length);
        });
    });

    var lines = [];
    table.forEach(function (row, index) {
        var line = [];
        row.forEach(function (cell, index) {
            line.push(
                (cell + (new Array(colWidths[index] - cell.toString().length + 1).join(' ')))
            );
        });
        lines.push(line.join(''));
    });

    console.log(lines.join('\n'));
};

module.exports = consoleTable;
