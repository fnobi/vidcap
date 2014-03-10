var fs = require('fs'),
    ffmpeg = require('fluent-ffmpeg'),
    Metalib = ffmpeg.Metadata;

var vidcap = function (opts, callback) {
    // setting
    var moviePath = opts.moviePath,
        interval = opts.interval || 0.25,
        size = opts.size || '150x100',
        basename = opts.basename || 'image',
        zeroPadding = opts.zeroPadding || false,

        outputDir = moviePath + '.vidcap';

    if (!moviePath) {
        return callback(new Error('movie not found.'));
    }

    // process
    Metalib(moviePath, function (metadata, err) {
        var duration = metadata.durationsec,
            count = Math.floor(duration / interval),

            timemarks = [];

        var keta = 10;
        var ketaFormat = '';
        if (zeroPadding) {
            while (keta < count) {
                keta *= 10;
                ketaFormat += '0';
            }
        }

        for (var i = 0; i < count; i++) {
            timemarks.push(String(i * interval));
        }

        var infs = fs.createReadStream(moviePath);

        var proc = new ffmpeg({ source: infs })
                .withSize(size)
                .takeScreenshots({
                    count: count,
                    timemarks: timemarks,
                    filename: basename + '.' +  '%' + ketaFormat + 'i_' + count
                }, outputDir, function (err, filenames) {
                    if (err){
                        return callback(err);
                    }
                    console.log(filenames);
                    console.log('screenshots were saved');
                    return callback();
                });
    });
};

module.exports = vidcap;
