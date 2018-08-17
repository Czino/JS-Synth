const AudioContext = window.AudioContext || window.webkitAudioContext
const Oscillator = require('./oscillator')

const Synth = function () {
    this.context = new AudioContext()
    this.oscillators = {}
}

Synth.prototype.play = function(freq, id) {
    if (this.oscillators[id]) {
        return
    }
    this.oscillators[id] = this.createOscillators()
    this.oscillators[id].forEach(oscillator => {
        oscillator.setFrequency(freq)
        oscillator.activate()
    })
}

Synth.prototype.stop = function(id) {
    if (!this.oscillators[id]) {
        return
    }
    this.oscillators[id].forEach(oscillator => {
        oscillator.deactivate()
    })
    delete this.oscillators[id]
}

Synth.prototype.createOscillators = function() {
    return [
        new Oscillator(this.context, 330, 'square'),
        new Oscillator(this.context, 440, 'sine'),
        new Oscillator(this.context, 660)
    ]
}

module.exports = Synth