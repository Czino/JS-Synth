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
    setTimeout(() => {
        if (this.oscillator.context) {
            this.oscillator.disconnect(this.context.destination)
        }
    }, 100)
}

module.exports = Oscillator