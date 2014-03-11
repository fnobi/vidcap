var fs = require('fs'),
    ffmpeg = require('fluent-ffmpeg'),
    Metalib = ffmpeg.Metadata;

var vidcap = function (opts, callback) {
    // setting
    var moviePath = opts.moviePath,
        interval = opts.interval || 0.25,
        size = opts.size,
        width = opts.width,
        height = opts.height,
        offset = Number(opts.offset || 0),
        duration = Number(opts.duration || 0),
        basename = opts.basename || 'image',
        zeroPadding = opts.zeroPadding || false,

        outputDir = moviePath + '.vidcap';

    if (!moviePath) {
        return callback(new Error('movie not found.'));
    }

    // process
    Metalib(moviePath, function (metadata, err) {
        duration = duration || metadata.durationsec;
        var count = Math.floor(duration / interval);
        var timemarks = [];

        var keta = 10;
        var ketaFormat = '';
        if (zeroPadding) {
            while (keta < count) {
                keta *= 10;
                ketaFormat += '0';
            }
        }

        var numFormat = '%' + ketaFormat + 'i';

        for (var i = 0; i < count; i++) {
            timemarks.push(String(offset + i * interval));
        }

        var infs = fs.createReadStream(moviePath);
        var proc = new ffmpeg({ source: infs });

        proc.withSize(size || [
            (width || '?'),
            (height || '?')
        ].join('x'));

        proc.takeScreenshots({
            count: count,
            timemarks: timemarks,
            filename: basename + '.' + numFormat + '_' + count
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
