const AudioContext = window.AudioContext || window.webkitAudioContext
const Oscillator = require('./oscillator')

const Synth = function () {
    this.context = new AudioContext()
    this.oscillators = [
        new Oscillator(this.context, 330, 'square'),
        new Oscillator(this.context, 440, 'sine'),
        new Oscillator(this.context, 660)
    ]
}

Synth.prototype.play = function() {
    this.oscillators.forEach(oscillator => {
        oscillator.activate()
    })
}

module.exports = Synth