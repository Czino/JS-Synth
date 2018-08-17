const Oscillator = function (context, frequency, type) {
    this.context = context
    this.oscillator = new OscillatorNode(context, {
        'type': type || 'sine',
        'frequency': frequency || 440
    })
    this.oscillator.start()
}

Oscillator.prototype.activate = function() {
    this.oscillator.connect(this.context.destination)
}

Oscillator.prototype.deactivate = function() {
    this.oscillator.disconnect(this.context.destination)
}

Oscillator.prototype.setFrequency = function(freq) {
    this.oscillator.frequency.setValueAtTime(freq, this.context.currentTime)
}

module.exports = Oscillator