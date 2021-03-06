(function () {
    var optimist = require('optimist');
    var consoleTable = require('console-table');

    var vidcap = require('./vidcap');

    var argv = optimist
            .boolean('help')
            .default('help', false)
            .describe('help', 'show this help.')

            .string('i')
            .alias('i', 'interval')
            .default('i', 0.25)
            .describe('i', 'capture interval.')

            .string('s')
            .alias('s', 'size')
            .describe('s', 'capture size.')

            .string('w')
            .alias('w', 'width')
            .describe('w', 'capture width.')

            .string('h')
            .alias('h', 'height')
            .describe('h', 'capture height.')

            .string('b')
            .alias('b', 'basename')
            .describe('b', 'output file basename.')

            .boolean('z')
            .alias('z', 'zero-padding')
            .default('z', false)
            .describe('z', 'use zero-padding number.')

            .string('d')
            .alias('d', 'duration')
            .describe('d', 'movie duration.')

            .string('offset')
            .default('offset', 0)
            .describe('offset', 'movie start offset time.')

            .string('f')
            .alias('f', 'format')
            .default('f', 'images')
            .describe('f', 'output format. (images|sprite|gif)')

            .argv;

    var moviePath = argv._.shift();

    if (argv.help || !moviePath) {
        optimist.showHelp();
        return;
    }

    vidcap({
        moviePath: moviePath,
        interval: argv.interval,
        size: argv.size,
        width: argv.width,
        height: argv.height,
        offset: argv.offset,
        duration: argv.duration,
        basename: argv.basename,
        format: argv.format,
        zeroPadding: argv.z
    }, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }

        consoleTable([
            ['size: ', result.size],
            ['trim: ', result.offset + 'secconds ~ ' + (result.offset + result.duration) + 'secconds'],
            ['interval: ', result.interval + 'secconds (' + (1 / result.interval) + 'fps)'],
            ['count: ', result.count],
            ['zero-padding: ', result.zeroPadding],
            ['output: ', result.output]
        ]);
    });
})();
