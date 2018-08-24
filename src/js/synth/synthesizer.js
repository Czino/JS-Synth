const AudioContext = window.AudioContext || window.webkitAudioContext
const Oscillator = require('./oscillator')
const Gain = require('./gain')
const Envelope = require('./envelope')

const Synth = function (polyphony) {
    this.context = new AudioContext()
    this.gain = 0.5
    // @TODO consider refactoring envelope into own module
    this.envelope = {
        'attack': 100,
        'decay': 0,
        'sustain': .5,
        'release': 3000
    }
    this.masterGain = new Gain(this.context, this.gain)
    this.oscillatorGroups = []
    for (let i = 0; i < polyphony; i++) {
        this.oscillatorGroups.push(this.createOscillatorGroup())
    }
    
    this.pan = 'TODO'
    this.masterGain.connect(this.context.destination)
    // this.pan.connect(this.masterGain.node)
}

Synth.prototype.play = function(freq, id) {
    let index = 0
    let group = this.oscillatorGroups[index]
    group.active = true
    group.oscillators.forEach(oscillator => {
        oscillator.setFrequency(freq)
        oscillator.activate()
    })
    group.envelope.start()
    clearTimeout(group.clear)
}

Synth.prototype.stop = function(id) {
    let index = 0
    let group = this.oscillatorGroups[index]
    group.active = false
    group.envelope.stop()
    group.clear = setTimeout(() => {
        if (!group.active) {
            group.oscillators.forEach(oscillator => {
                oscillator.deactivate()
            })
        }
    }, this.envelope.release)
}

Synth.prototype.createOscillatorGroup = function(type, freq) {
    let oscillatorGroup = {
        'active': false,
        'oscillators': [
            // new Oscillator(
            //     this.context,
            //     type || 'sine',
            //     freq || 440,
            //     -3
            // ),
            new Oscillator(
                this.context,
                type || 'sine',
                freq || 440,
                0
            ),
            // new Oscillator(
            //     this.context,
            //     type || 'sine',
            //     freq || 440,
            //     3
            // )
        ],
        'envelope': this.createEnvelopeGain()
    }

    oscillatorGroup.oscillators.forEach(oscillator => {
        oscillator.connect(oscillatorGroup.envelope)
    })

    return oscillatorGroup
}

Synth.prototype.createEnvelopeGain = function() {
    let envelopeGain = new Envelope(this.context, this.envelope)
    envelopeGain.connect(this.masterGain)
    return envelopeGain
}

module.exports = Synth