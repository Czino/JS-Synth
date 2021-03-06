const AudioContext = window.AudioContext || window.webkitAudioContext
const Oscillator = require('./oscillator')
const Gain = require('./gain')
const Envelope = require('./envelope')

const Synth = function (settings) {
    this.context = new AudioContext()
    this.gain = settings.gain || 0.5
    this.envelope = {
        'attack': settings.attack || 100,
        'decay': settings.decay || 300,
        'sustain': settings.sustain || .5,
        'release': settings.release || 2000
    }
    this.waveShape = 'sine'
    this.masterGain = new Gain(this.context, this.gain)
    this.oscillatorGroups = []

    for (let i = 0; i < settings.polyphony; i++) {
        this.oscillatorGroups.push(this.createOscillatorGroup())
    }

    this.pan = 'TODO'
    this.masterGain.connect(this.context.destination)
    // this.pan.connect(this.masterGain.node)
}

Synth.prototype.setMaster = function(value) {
    this.masterGain.setValue(value)
}

Synth.prototype.setPan = function(value) {
    // @TODO
}

Synth.prototype.setWaveShape = function(shape) {
    this.waveShape = shape
    this.oscillatorGroups.forEach(group => {
        group.oscillator.setType(this.waveShape)
    })
}

Synth.prototype.setEnvelope = function(settings) {
    this.envelope = {
        'attack': settings && settings.attack ? settings.attack : this.envelope.attack,
        'decay': settings && settings.decay ? settings.decay : this.envelope.decay,
        'sustain': settings && settings.sustain ? settings.sustain : this.envelope.sustain,
        'release': settings && settings.release ? settings.release : this.envelope.release
    }
    this.oscillatorGroups.forEach(group => {
        group.envelope.setValues(this.envelope)
    })
}

Synth.prototype.play = function(freq, id) {
    let index = this.oscillatorGroups.findIndex(group => {
        // check if group is already assigned to id
        return group.key === id
    })

    // if no group is assigned, find free group
    if (index === -1) {
        index = this.oscillatorGroups.findIndex(group => {
            return group.key === null
        })
    }
    let group = this.oscillatorGroups[index]
    group.active = true
    group.key = id
    group.oscillator.setFrequency(freq)
    group.oscillator.activate()
    group.envelope.start()
    clearTimeout(group.clear)
}

Synth.prototype.stop = function(id) {
    let index = this.oscillatorGroups.findIndex(group => {
        return group.key === id
    })
    if (index === -1) {
        return
    }
    let group = this.oscillatorGroups[index]
    group.active = false
    group.key = null
    group.envelope.stop()
    group.clear = setTimeout(() => {
        if (!group.active) {
            group.oscillator.deactivate()
        }
    }, this.envelope.release)
}

Synth.prototype.createOscillatorGroup = function(type, freq) {
    let oscillatorGroup = {
        'active': false,
        'key': null,
        'oscillator': new Oscillator(
            this.context,
            type || this.waveShape,
            freq || 440,
            0
        ),
        'envelope': this.createEnvelopeGain()
    }

    oscillatorGroup.oscillator.connect(oscillatorGroup.envelope)

    return oscillatorGroup
}

Synth.prototype.createEnvelopeGain = function() {
    let envelopeGain = new Envelope(this.context, this.envelope)
    envelopeGain.connect(this.masterGain)
    return envelopeGain
}

module.exports = Synth