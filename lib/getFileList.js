var getFileList = function (opts) {
    var outputDir = opts.outputDir;
    var basename = opts.basename;
    var count = opts.count;
    var zeroPadding = opts.zeroPadding;

    var padLength = String(count).length; 

    function pad (num) {
        if (!zeroPadding) {
            return num;
        }
        return ((new Array(padLength)).join('0') + num).slice(-padLength);
    }

    var list = [];
    for (var i = 1; i <= count; i++) {
        list.push([outputDir, '/', basename, '.', pad(i), '_', count, '.jpg'].join(''));
    }

    return list;
};

module.exports = getFileList;
