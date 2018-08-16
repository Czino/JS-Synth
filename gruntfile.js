const grunt = require('grunt')

grunt.initConfig({
    'browserify': {
        'synth': {
            'src': ['./src/js/synth.js'],
            'dest': './dist/js/synth.js'
        },
        'main': {
            'src': ['./src/js/main.js'],
            'dest': './dist/js/main.js'
        }
    },
    'watch': {
        'sources': {
            'files': [
                './src/js/**/*.js'
            ],
            'tasks': ['browserify']
        }
    }
})

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browserify');

grunt.registerTask('default', ['browserify', 'watch']);