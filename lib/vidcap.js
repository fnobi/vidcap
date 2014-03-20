var fs = require('fs');
var path = require('path');

var async = require('async');
var ffmpeg = require('fluent-ffmpeg');
var Metalib = ffmpeg.Metadata;
var toichi = require('toichi');
var recursive = require('recursive-fs');

var getFileList = require(__dirname + '/getFileList');

var FORMAT_TYPE = {
    IMAGES: 'images',
    SPRITE: 'sprite',
    GIF: 'gif'    
};


var vidcap = function (opts, callback) {
    // setting
    var moviePath = opts.moviePath;
    var interval = opts.interval || 0.25;
    var size = opts.size;
    var width = opts.width;
    var height = opts.height;
    var offset = Number(opts.offset || 0);
    var duration = Number(opts.duration || 0);
    var format = opts.format || FORMAT_TYPE.IMAGES;
    var basename = opts.basename || path.basename(moviePath, path.extname(moviePath));
    var zeroPadding = opts.zeroPadding || false;

    var output = basename + '.vidcap';

    if (!moviePath) {
        return callback(new Error('no movie path.'));
    }

    var metadata, count, originalSize;

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
        originalSize = [
            metadata.video.resolution.w,
            metadata.video.resolution.h
        ].join('x');

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

        if (!size && !width && !height) {
            size = originalSize;
        } else if (!size) {
            size = [
                width || '?',
                height || '?'
            ].join('x');
        }
        proc.withSize(size);

        proc.takeScreenshots({
            outputDir: output,
            count: count,
            timemarks: timemarks,
            filename: basename + '.' + numFormat + '_' + count
        }, output, next);

    }, function (next) {
        if (format == FORMAT_TYPE.IMAGES) {
            return next();
        }

        var dest;
        if (format == FORMAT_TYPE.SPRITE) {
            dest = basename + '.jpg';
        } else if (format == FORMAT_TYPE.GIF) {
            dest = basename + '.gif';
        }

        var opts = {
            files: getFileList({
                outputDir: output,
                basename: basename,
                count: count,
                zeroPadding: zeroPadding
            }),
            dest: dest
        };

        if (format == FORMAT_TYPE.GIF) {
            opts.interval = interval;
        }

        toichi(opts, function (err, result) {
            if (err) {
                return next(err);
            }

            recursive.rmdirr(output, function (err) {
                if (err) {
                    return next(err);
                }

                output = dest;
                next();
            });
        });

    }], function (err) {
        if (err){
            return callback(err);
        }

        var result = {
            output: output,
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
