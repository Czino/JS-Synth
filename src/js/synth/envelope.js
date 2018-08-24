const Envelope = function (context, env) {
    this.context = context
    this.node = this.context.createGain()
    this.attack = env ? env.attack / 1000 : .3
    this.decay = env ? env.decay / 1000 : 0
    this.sustain = env ? env.sustain : .5
    this.release = env ? env.release / 1000 : .3
    this.node.gain.setValueAtTime(0.001, this.context.currentTime)
}

Envelope.prototype.connect = function(out) {
    if (out.node) {
        this.node.connect(out.node)
    } else {
        this.node.connect(out)
    }
}

Envelope.prototype.start = function() {
    this.node.gain.cancelScheduledValues(this.context.currentTime)
    this.node.gain.exponentialRampToValueAtTime(this.node.gain.value, this.context.currentTime)
    setTimeout(() => {
        this.node.gain.linearRampToValueAtTime(this.sustain, this.context.currentTime + this.attack)
    }, 50)

    clearInterval(this.interval)
    this.interval = setInterval(() => {
        document.getElementById('debug').style.height = (this.node.gain.value * 100).toFixed() + '%'
    }, 50)
}

Envelope.prototype.stop = function() {
    this.node.gain.cancelScheduledValues(this.context.currentTime)
    this.node.gain.exponentialRampToValueAtTime(this.node.gain.value, this.context.currentTime)
    this.node.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + this.release)
}

module.exports = Envelope