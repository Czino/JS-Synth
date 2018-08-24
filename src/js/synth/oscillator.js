const Oscillator = function (context, type, frequency, detune) {
    this.context = context
    this.oscillator = new OscillatorNode(context, {
        'type': type || 'sine',
        'frequency': frequency || 440,
        'detune': detune || 0
    })
    this.oscillator.start()
}

Oscillator.prototype.connect = function(out) {
    if (out.node) {
        this.out = out.node
    } else {
        this.out = out
    }
}

Oscillator.prototype.activate = function() {
    this.oscillator.connect(this.out)
}

Oscillator.prototype.deactivate = function() {
    this.oscillator.disconnect(this.out)
}

Oscillator.prototype.setFrequency = function(freq) {
    this.oscillator.frequency.setValueAtTime(freq, this.context.currentTime)
}

module.exports = Oscillator