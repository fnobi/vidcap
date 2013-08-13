var fs = require('fs'),
    ffmpeg = require('fluent-ffmpeg'),
    Metalib = ffmpeg.Metadata;

var vidcap = function (opts, callback) {
    // setting
    var moviePath = opts.moviePath,
        interval = opts.interval || 0.25,
        size = opts.size || '150x100',

        outputDir = moviePath + '.vidcap';

    if (!moviePath) {
        return callback(new Error('movie not found.'));
    }

    // process
    Metalib(moviePath, function (metadata, err) {
        var duration = metadata.durationsec,
            count = Math.floor(duration / interval),

            timemarks = [];

        for (var i = 0; i < count; i++) {
            timemarks.push(String(i * interval));
        }

        var infs = fs.createReadStream(moviePath);

        var proc = new ffmpeg({ source: infs })
                .withSize(size)
                .takeScreenshots({
                    count: count,
                    timemarks: timemarks,
                    filename: 'screenshot_%i_%s'
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