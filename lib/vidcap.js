var fs = require('fs');

var async = require('async');
var ffmpeg = require('fluent-ffmpeg');
var Metalib = ffmpeg.Metadata;

var vidcap = function (opts, callback) {
    // setting
    var moviePath = opts.moviePath;
    var interval = opts.interval || 0.25;
    var size = opts.size;
    var width = opts.width;
    var height = opts.height;
    var offset = Number(opts.offset || 0);
    var duration = Number(opts.duration || 0);
    var basename = opts.basename || 'image';
    var zeroPadding = opts.zeroPadding || false;

    var outputDir = moviePath + '.vidcap';

    if (!moviePath) {
        return callback(new Error('no movie path.'));
    }

    var metadata, count;

    // main flow
    async.series([function (next) {
        fs.exists(moviePath, function (isExists) {
            if (!isExists) {
                return next(new Error('"' + moviePath + '" is not found.'));
            }
            return next();
        });
    }, function (next) {
        Metalib(moviePath, function (m, err) {
            metadata = m;
            next(err);
        });
    }, function (next) {
        duration = duration || metadata.durationsec;
        count = Math.floor(duration / interval);

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

        size = size || [
            (width || '?'),
            (height || '?')
        ].join('x');
        proc.withSize(size);

        proc.takeScreenshots({
            count: count,
            timemarks: timemarks,
            filename: basename + '.' + numFormat + '_' + count
        }, outputDir, next);

    }], function (err) {
        if (err){
            return callback(err);
        }

        var result = {
            outputDir: outputDir,
            count: count,
            zeroPadding: zeroPadding,
            size: size,
            interval: interval,
            offset: offset,
            duration: duration
        };

        callback(null, result);
    });
};

module.exports = vidcap;
