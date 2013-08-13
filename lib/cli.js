(function () {
    var optimist = require('optimist'),
        vidcap = require('./vidcap');

    var argv = optimist
            .boolean('h')
            .alias('h', 'help')
            .default('h', false)
            .describe('h', 'show this help.')

            .string('i')
            .alias('i', 'interval')
            .default('i', 0.25)
            .describe('i', 'capture interval.')

            .string('s')
            .alias('s', 'size')
            .default('s', '150x100')
            .describe('s', 'capture size.')

            .argv;

    if (argv.h) {
        optimist.showHelp();
        return;
    }

    vidcap({
        interval: argv.interval,
        size: argv.size,
        moviePath: argv._.shift()
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
})();